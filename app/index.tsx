import { ACCESS_TOKEN } from "@env";
import { JSX, useEffect, useState } from "react";
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
  });

  const [entities, setEntities] = useState<EntityMapping>(initialEntities);

  useEffect(() => {
    const ws = new WebSocket(
      "https://home.garridoegarridolda.pt/api/websocket",
    );

    ws.onopen = () => {
      setWsState((st) => ({ ...st, connected: true }));
    };

    ws.onclose = () => {
      setWsState({ connected: false, auth: false, subscribed: false });
    };

    ws.onmessage = (e) => {
      if (!wsState.auth) {
        ws.send(
          JSON.stringify({
            type: "auth",
            access_token: ACCESS_TOKEN,
          }),
        );
        setWsState((st) => ({ ...st, auth: true }));
        console.log("Authenticated");
        return;
      }

      if (!wsState.subscribed) {
        const entityIds = Object.entries(entities).map((k) => k[0]);

        ws.send(
          JSON.stringify({
            id: 18,
            type: "subscribe_events",
            entity_ids: entityIds,
          }),
        );
        setWsState((st) => ({ ...st, subscribed: true }));
        console.log("Subscribed");
        return;
      }

      const data = JSON.parse(e.data);
      console.log(data);
    };

    return ws.close();
  }, []);

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
