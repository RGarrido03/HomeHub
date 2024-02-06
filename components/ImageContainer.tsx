import { Image } from "expo-image";
import { JSX } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

type ImageContainerProps = {
  item: string;
};

export default function ImageContainer({
  item,
}: ImageContainerProps): JSX.Element {
  return (
    <View style={styles.imageContainer}>
      <Image
        contentFit="cover"
        source={item}
        blurRadius={64}
        style={styles.image}
      />
      <Image
        contentFit="contain"
        source={item}
        style={[styles.image, styles.absolute]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  absolute: {
    position: "absolute",
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});
