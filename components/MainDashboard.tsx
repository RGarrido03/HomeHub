import { BlurView } from "expo-blur";
import { JSX } from "react";
import {
  ColorSchemeName,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";

import Button from "@/components/Button";
import { EntityMapping } from "@/types/device";

type MainDashboardProps = {
  entities: EntityMapping;
};

export default function MainDashboard({
  entities,
}: MainDashboardProps): JSX.Element {
  const theme: ColorSchemeName = useColorScheme();

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      style={styles.blurContainer}
      tint={theme === "dark" ? "dark" : "default"}
    >
      <FlatList
        data={Object.entries(entities)}
        style={[styles.blurContainer, styles.containerView]}
        numColumns={3}
        contentContainerStyle={{ gap: 16 }}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <Button
            title={item[1].state.value.toString()}
            icon={item[1].icon}
            unitOfMeasurement={item[1].unitOfMeasurement}
          />
        )}
        keyExtractor={(item) => item[0]}
      />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 32,
    overflow: "hidden",
  },
  containerView: {
    padding: 16,
    gap: 16,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
});
