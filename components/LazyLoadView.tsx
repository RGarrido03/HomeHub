import { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

type LazyLoadViewProps = {
  item: string;
  currentIndex: number;
  index: number;
};

export default function LazyLoadView({
  item,
  currentIndex,
  index,
}: LazyLoadViewProps): JSX.Element {
  if (!(currentIndex - index in [-1, 0, 1])) {
    return <View style={styles.imageContainer} />;
  }

  return (
    <View style={styles.imageContainer}>
      <Image contentFit={"cover"} source={item} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#111",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
