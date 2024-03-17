import { STREAM } from "@env";
import { StyleSheet } from "react-native";
import { VLCPlayer } from "react-native-vlc-media-player";

export default function RtspPlayer() {
  return (
    <VLCPlayer
      style={[styles.video]}
      source={{
        uri: STREAM,
      }}
      videoAspectRatio="4:3"
    />
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
