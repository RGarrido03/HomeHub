import { Image } from "expo-image";
import { JSX } from "react";
import { StyleSheet, View } from "react-native";

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
  if (isActive(currentIndex, index)) {
    return (
      <View style={styles.imageContainer}>
        <Image contentFit="contain" source={item} style={styles.image} />
      </View>
    );
  }

  return <></>;
}

const isActive = (currentIndex: number, index: number): boolean => {
  return currentIndex === index || currentIndex + 1 === index;
};

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
