import {
  ColorSchemeName,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { JSX } from "react";
import Clock from "../components/Clock";
import Slider from "../components/Slider";

export default function App(): JSX.Element {
  const theme: ColorSchemeName = useColorScheme();

  return (
    <View style={styles.baseContainer}>
      <Slider />
      <View style={styles.container}>
        <Clock />
        <BlurView
          experimentalBlurMethod={"dimezisBlurView"}
          style={styles.blurContainer}
          tint={theme === "dark" ? "dark" : "default"}
        >
          <Text>Open up App.tsx to start working on your app!</Text>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
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
  blurContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
});
