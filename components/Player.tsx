import { STREAM } from "@env";
import { StyleSheet } from "react-native";
import { VLCPlayer } from "react-native-vlc-media-player";

export default function Player() {
  return (
    <VLCPlayer
      style={styles.view}
      videoAspectRatio="4:3"
      source={{
        uri: STREAM,
      }}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
