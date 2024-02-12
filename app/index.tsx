import { ACCESS_TOKEN } from "@env";
import { JSX, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

import Clock from "@/components/Clock";
import MainDashboard from "@/components/MainDashboard";
import Slider from "@/components/Slider";
import { initialEntities } from "@/data/entities";
import { EntityMapping } from "@/types/device";
import { WsState } from "@/types/socket";

export default function App(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [wsState, setWsState] = useState<WsState>({
    connected: false,
    auth: false,
    subscribed: false,
    ack: false,
  });

  const ws = useRef<WebSocket>();
  const [entities, setEntities] = useState<EntityMapping>(initialEntities);

  useEffect(() => {
    ws.current = new WebSocket(
      "https://home.garridoegarridolda.pt/api/websocket",
    );

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
            id: 18,
            type: "subscribe_entities",
            entity_ids: entityIds,
          }),
        );
        setWsState((st) => ({ ...st, subscribed: true }));
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
      const data = JSON.parse(e.data);
      console.log(data);
    };
  }, [wsState]);

  return (
    <PaperProvider>
      <View style={styles.baseContainer}>
        <Slider />
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
              <MainDashboard entities={entities} />
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
