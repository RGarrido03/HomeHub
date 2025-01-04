import { StyleSheet, Text } from "react-native";

export default function RtspPlayer() {
  return (
    <Text style={styles.video}>Not implemented</Text>
    // <VLCPlayer
    //   style={[styles.video]}
    //   source={{
    //     uri: STREAM,
    //   }}
    //   videoAspectRatio="4:3"
    // />
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
