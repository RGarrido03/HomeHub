import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { JSX } from "react";
import Clock from "./components/Clock";

export default function App(): JSX.Element {
  return (
    <View style={styles.baseContainer}>
      <Image
        contentFit={"cover"}
        source={"https://picsum.photos/1920/1080"}
        style={styles.image}
      />
      <View style={styles.container}>
        <Clock />
        <BlurView
          experimentalBlurMethod={"dimezisBlurView"}
          style={styles.blurContainer}
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
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
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
