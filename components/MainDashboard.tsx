import { BlurView } from "expo-blur";
import {
  ColorSchemeName,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function MainDashboard() {
  const theme: ColorSchemeName = useColorScheme();

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      style={styles.blurContainer}
      tint={theme === "dark" ? "dark" : "default"}
    >
      <View style={[styles.blurContainer, styles.containerView]}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  containerView: {
    padding: 16,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
});
