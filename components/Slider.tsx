import { StyleSheet, View } from "react-native";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { JSX, useState } from "react";
import { Image } from "expo-image";

type LazyLoadViewProps = {
  item: string;
  currentIndex: number;
  index: number;
};

export default function Slider() {
  const urls: string[] = [
    "https://picsum.photos/1922/1082",
    "https://picsum.photos/1920/1080",
    "https://picsum.photos/1921/1081",
    "https://picsum.photos/1923/1083",
    "https://picsum.photos/1924/1084",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function onPageSelected(e: PagerViewOnPageSelectedEvent): void {
    setCurrentIndex(e.nativeEvent.position);
  }

  return (
    <PagerView style={styles.image} onPageSelected={onPageSelected}>
      {urls.map((url, index) => (
        <LazyLoadView
          key={index}
          item={url}
          index={index}
          currentIndex={currentIndex}
        />
      ))}
    </PagerView>
  );
}

const LazyLoadView = ({
  item,
  currentIndex,
  index,
}: LazyLoadViewProps): JSX.Element => {
  if (!indexIsActive(currentIndex, index)) {
    return <View style={styles.imageContainer}></View>;
  }

  // Expensive render full
  return (
    <View style={styles.imageContainer}>
      <Image contentFit={"cover"} source={item} style={styles.image} />
    </View>
  );
};

export function indexIsActive(currentIndex: number, myIndex: number): boolean {
  return (
    currentIndex === myIndex ||
    currentIndex - 1 === myIndex ||
    currentIndex + 1 === myIndex
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
