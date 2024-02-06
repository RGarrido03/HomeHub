import * as MediaLibrary from "expo-media-library";
import {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ImageContainer from "./ImageContainer";

type SliderProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Slider({ open, setOpen }: SliderProps): JSX.Element {
  const [ready, setReady] = useState<boolean>(false);
  const [urls, setUrls] = useState<string[]>([]);
  const [, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

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
    let interval: NodeJS.Timeout | null = null;
    getPhotos().then((data) => {
      setUrls(data);
      setReady(true);

      interval = setInterval(() => {
        setCurrentIndex((idx) => {
          flatListRef.current?.scrollToIndex({
            animated: true,
            index: idx < data.length - 1 ? idx + 1 : 0,
          });
          return idx < data.length - 1 ? idx + 1 : 0;
        });
      }, 5000);
    });
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return ready ? (
    <FlatList
      ref={flatListRef}
      style={styles.pagerView}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      data={urls}
      renderItem={({ item }) => <ImageContainer item={item} />}
      windowSize={2}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      removeClippedSubviews
    />
  ) : (
    <View style={styles.waitingView}>
      <Text style={{ color: "#fff" }}>Fetching photos...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: "100%",
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
