import * as MediaLibrary from "expo-media-library";
import { JSX, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";

import LazyLoadView from "./LazyLoadView";

export default function Slider(): JSX.Element {
  const [ready, setReady] = useState<boolean>(false);
  const [urls, setUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
      setReady(true);
    });
  }, []);

  function onPageSelected(e: PagerViewOnPageSelectedEvent): void {
    setCurrentIndex(e.nativeEvent.position);
  }

  return ready ? (
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
  ) : (
    <View style={styles.pagerView}>
      <Text style={{ color: "#fff" }}>Fetching photos...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  waitingView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
