import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { JSX, useEffect, useState } from "react";
import LazyLoadView from "./LazyLoadView";
import { StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function Slider(): JSX.Element {
  const [urls, setUrls] = useState<string[]>([]);

  const getPhotos = async (): Promise<string[]> => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      alert("Camera roll permission is needed.");
      return [];
    }

    const assets = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      first: 1000,
    });

    return assets.assets.map((asset) => asset.uri);
  };

  useEffect(() => {
    getPhotos().then((data) => {
      setUrls(data);
    });
  }, []);

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
