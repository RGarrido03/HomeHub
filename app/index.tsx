import { JSX, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";

import Clock from "../components/Clock";
import MainDashboard from "../components/MainDashboard";
import Slider from "../components/Slider";

export default function App(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <PaperProvider>
      <View style={styles.baseContainer}>
        <Slider open={open} setOpen={setOpen} />
        <View style={styles.container}>
          <Clock />
          {open && <MainDashboard />}
        </View>
      </View>
    </PaperProvider>
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
});
