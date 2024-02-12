import { BlurView } from "expo-blur";
import { JSX } from "react";
import {
  ColorSchemeName,
  StyleSheet,
  useColorScheme,
  View,
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
      <View style={[styles.blurContainer, styles.containerView]}>
        {Object.entries(entities).map(([entity_id, entity]) => (
          <Button
            key={entity_id}
            title={entity.state.value.toString()}
            icon={entity.icon}
            unitOfMeasurement={entity.unitOfMeasurement}
          />
        ))}
      </View>
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
