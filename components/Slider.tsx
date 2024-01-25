import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { JSX, useState } from "react";
import LazyLoadView from "./LazyLoadView";
import { StyleSheet } from "react-native";

export default function Slider(): JSX.Element {
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
    <PagerView style={styles.pagerView} onPageSelected={onPageSelected}>
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

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
});
