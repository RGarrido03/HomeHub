import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  ColorSchemeName,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type ButtonProps = {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  unitOfMeasurement: string;
};

export default function Button({
  title,
  icon,
  unitOfMeasurement,
}: ButtonProps) {
  const theme: ColorSchemeName = useColorScheme();

  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => console.log("Pressed")}
      activeOpacity={0.7}
    >
      <View style={styles.containerView}>
        {icon && <MaterialIcons size={32} name={icon} />}
        <Text
          style={[
            styles.title,
            theme === "dark" ? styles.darkTitle : styles.lightTitle,
          ]}
        >
          {title} {unitOfMeasurement}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  containerView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    opacity: 0.7,
  },
  lightTitle: {
    color: "#000",
  },
  darkTitle: {
    color: "#fff",
  },
});
