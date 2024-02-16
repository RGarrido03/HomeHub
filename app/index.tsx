import { HOST } from "@env";
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
import Player from "@/components/Player";
import Slider from "@/components/Slider";
import { initialEntities } from "@/data/entities";
import { EntityMapping } from "@/types/device";
import {
  isMessageAuthOk,
  isMessageAuthRequired,
  isMessageFetchedStateResponse,
  isMessageReceivedEvent,
  isMessageServiceResponse,
} from "@/utils/inferType";
import {
  fetchStates,
  parseEvent,
  parseServiceResponse,
  parseState,
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
  const [wsId, setWsId] = useState<number>(1);

  // WebSocket
  const ws = useRef<WebSocket>();

  useEffect(() => {
    ws.current = new WebSocket(HOST);

    ws.current.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data);

      if (isMessageReceivedEvent(message)) {
        parseEvent(message, entities, setEntities);
      } else if (isMessageServiceResponse(message)) {
        parseServiceResponse(message);
      } else if (isMessageAuthRequired(message)) {
        sendAuth(ws);
      } else if (isMessageAuthOk(message)) {
        fetchStates(ws);
      } else if (isMessageFetchedStateResponse(message)) {
        const entityIds = Object.entries(entities).map((k) => k[0]);
        parseState(message, entityIds, entities, setEntities);
        subscribeEntities(ws, entityIds);
      }
    };

    return () => ws.current?.close();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.baseContainer}>
        {background === "camera" ? <Player /> : <Slider />}
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
