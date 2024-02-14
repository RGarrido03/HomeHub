import { ACCESS_TOKEN, HOST, STREAM } from "@env";
import { useKeepAwake } from "expo-keep-awake";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import { JSX, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { RTCView } from "react-native-webrtc";

import Clock from "@/components/Clock";
import MainDashboard from "@/components/MainDashboard";
import Slider from "@/components/Slider";
import { initialEntities } from "@/data/entities";
import { EntityMapping } from "@/types/device";
import { ReceivedEvent, WsState } from "@/types/socket";

export default function App(): JSX.Element {
  useKeepAwake();
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync("overlay-swipe");
  setStatusBarHidden(true);

  const [open, setOpen] = useState<boolean>(false);
  const [wsState, setWsState] = useState<WsState>({
    connected: false,
    auth: false,
    subscribed: false,
    ack: false,
    id: 1,
  });

  const ws = useRef<WebSocket>();
  const [entities, setEntities] = useState<EntityMapping>(initialEntities);

  useEffect(() => {
    ws.current = new WebSocket(HOST);

    ws.current.onopen = () => {
      setWsState((st) => ({ ...st, connected: true }));
    };

    ws.current.onmessage = () => {
      ws.current?.send(
        JSON.stringify({
          type: "auth",
          access_token: ACCESS_TOKEN,
        }),
      );
      setWsState((st) => ({ ...st, auth: true }));
      console.log("Authenticated");
    };

    return () => {
      setWsState({
        connected: false,
        auth: false,
        subscribed: false,
        ack: false,
        id: 1,
      });
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current || !wsState.connected) {
      return;
    }

    if (!wsState.auth) {
      ws.current.onmessage = () => {
        ws.current?.send(
          JSON.stringify({
            type: "auth",
            access_token: ACCESS_TOKEN,
          }),
        );
        setWsState((st) => ({ ...st, auth: true }));
        console.log("Authenticated");
      };
      return;
    }

    if (!wsState.subscribed) {
      ws.current.onmessage = () => {
        const entityIds = Object.entries(entities).map((k) => k[0]);

        ws.current?.send(
          JSON.stringify({
            id: 1,
            type: "subscribe_entities",
            entity_ids: entityIds,
          }),
        );
        setWsState((st) => ({ ...st, subscribed: true, id: 2 }));
        console.log("Subscribed");
      };
      return;
    }

    if (!wsState.ack) {
      ws.current.onmessage = () => {
        setWsState((st) => ({ ...st, ack: true }));
        console.log("Acknowledged");
      };
      return;
    }

    ws.current.onmessage = (e: MessageEvent<string>) => {
      const data: ReceivedEvent = JSON.parse(e.data);
      if (data.id === 1 && data.type === "event") {
        const receivedState = Object.entries(data.event.c)[0];
        const entityId = receivedState[0];
        const newValue = receivedState[1]["+"].s;

        const entity = entities[entityId];
        entity.state.value = newValue;

        const newEntities: EntityMapping = {
          ...entities,
          [entityId]: entity,
        };

        setEntities(newEntities);
      } else {
        console.log(data);
      }
    };
  }, [wsState]);

  const camera: boolean = false;

  return (
    <PaperProvider>
      <View style={styles.baseContainer}>
        {camera ? <RTCView streamURL={STREAM} /> : <Slider />}
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
                wsState={wsState}
                setWsState={setWsState}
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
