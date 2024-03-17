import { HOST } from "@env";
import TurboLogger from "@mattermost/react-native-turbo-log";
import { useKeepAwake } from "expo-keep-awake";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import { JSX, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

import Clock from "@/components/Clock";
import MainDashboard from "@/components/MainDashboard";
import RtspPlayer from "@/components/RtspPlayer";
import Slider from "@/components/Slider";
import { initialEntities } from "@/data/entities";
import { EntityMapping } from "@/types/device";
import {
  isMessageAuthOk,
  isMessageAuthRequired,
  isMessageReceivedEvent,
  isMessageReceivedEventAll,
  isMessageServiceResponse,
} from "@/utils/inferType";
import {
  parseEvent,
  parseEventAll,
  parseServiceResponse,
  sendAuth,
  subscribeEntities,
} from "@/utils/socket";

export default function App(): JSX.Element {
  // Keep the screen awake
  useKeepAwake();

  // Lock orientation to landscape left
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

  // Hide both status bar and navigation bar
  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync("overlay-swipe");
  setStatusBarHidden(true);

  // States
  const [open, setOpen] = useState<boolean>(false);
  const [background, setBackground] = useState<"camera" | "slider">("slider");
  const [entities, setEntities] = useState<EntityMapping>(initialEntities);
  const [wsId, setWsId] = useState<number>(2);

  // WebSocket
  const ws = useRef<WebSocket>();

  useEffect(() => {
    const logic = async () => {
      await TurboLogger.configure();
      ws.current = new WebSocket(HOST);

      ws.current.onopen = () => console.info("Websocket opened");
      ws.current.onclose = (ev) => console.warn("WebSocket closed", ev);

      ws.current.onmessage = (event: MessageEvent<string>) => {
        const message = JSON.parse(event.data);

        if (isMessageReceivedEvent(message)) {
          parseEvent(message, entities, setEntities, setBackground);
        } else if (isMessageServiceResponse(message)) {
          parseServiceResponse(message);
        } else if (isMessageReceivedEventAll(message)) {
          parseEventAll(message, entities, setEntities);
        } else if (isMessageAuthRequired(message)) {
          sendAuth(ws);
        } else if (isMessageAuthOk(message)) {
          const entityIds = Object.entries(entities).map((k) => k[0]);
          subscribeEntities(ws, entityIds, wsId, setWsId);
        } else {
          console.log("\nIgnored", message);
        }
      };

      setInterval(() => {
        setWsId((id) => {
          console.debug("Pinging", {
            id,
            type: "ping",
          });

          ws.current?.send(
            JSON.stringify({
              id,
              type: "ping",
            }),
          );
          return id + 1;
        });
      }, 60000);
    };
    logic();

    return () => ws.current?.close();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.baseContainer}>
        {background === "camera" ? <RtspPlayer /> : <Slider />}
        <TouchableOpacity
          style={styles.openTouchable}
          onPress={() => setOpen(!open)}
        />
        <View style={styles.container}>
          <Clock />
          {open && (
            <Animated.View
              style={styles.blurContainerWrapper}
              entering={FadeInRight}
              exiting={FadeOutRight}
            >
              <MainDashboard
                entities={entities}
                ws={ws.current}
                wsId={wsId}
                setWsId={setWsId}
              />
            </Animated.View>
          )}
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  openTouchable: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  blurContainerWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  container: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 32,
    display: "flex",
    flexDirection: "row",
    gap: 32,
    alignItems: "flex-end",
  },
});
