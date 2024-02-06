import { JSX, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

import Clock from "../components/Clock";
import MainDashboard from "../components/MainDashboard";
import Slider from "../components/Slider";

export default function App(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

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
              <MainDashboard />
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
