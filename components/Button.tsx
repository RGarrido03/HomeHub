import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
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
  value: string | number;
  icon?: keyof typeof MaterialIcons.glyphMap;
  unitOfMeasurement: string;
};

export default function Button({
  title,
  value,
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
        {icon && <MaterialIcons size={32} name={icon} style={styles.icon} />}
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.title,
              theme === "dark" ? styles.darkTitle : styles.lightTitle,
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.value,
              theme === "dark" ? styles.darkTitle : styles.lightTitle,
            ]}
          >
            {value} {unitOfMeasurement}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  containerView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    gap: 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  icon: {
    opacity: 0.7,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    opacity: 0.7,
  },
  value: {
    opacity: 0.5,
    fontSize: 16,
    textAlign: "left",
  },
  lightTitle: {
    color: "#000",
  },
  darkTitle: {
    color: "#fff",
  },
});
