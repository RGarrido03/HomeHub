import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Dispatch, SetStateAction } from "react";
import {
  ColorSchemeName,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Entity } from "@/types/device";

type ButtonProps = {
  entity: Entity;
  ws: WebSocket | undefined;
  wsId: number;
  setWsId: Dispatch<SetStateAction<number>>;
};

export default function Button({ entity, ws, wsId, setWsId }: ButtonProps) {
  const theme: ColorSchemeName = useColorScheme();

  const handleOnPress = () => {
    if (entity.action && ws) {
      ws.send(
        JSON.stringify({
          type: "call_service",
          domain: entity.action.domain,
          service: entity.action.serviceMapping
            ? entity.action.serviceMapping[entity.state.value]
            : entity.action.service,
          service_data: entity.action.data,
          id: wsId,
        }),
      );
      setWsId((st) => st + 1);
      return;
    }
    console.log(`No action is configured for ${entity.name}`);
  };

  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={handleOnPress}
      activeOpacity={0.7}
    >
      <View style={styles.containerView}>
        {entity.icon && (
          <MaterialIcons size={32} name={entity.icon} style={styles.icon} />
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.title,
              theme === "dark" ? styles.darkTitle : styles.lightTitle,
            ]}
          >
            {entity.name}
          </Text>
          {!entity.state.hidden && (
            <Text
              style={[
                styles.value,
                theme === "dark" ? styles.darkTitle : styles.lightTitle,
              ]}
            >
              {entity.state.value === "unavailable"
                ? "Indisponível"
                : entity.state.mapping
                  ? entity.state.mapping[entity.state.value.toString()]
                  : entity.state.value}{" "}
              {entity.state.value !== "unavailable" && entity.unitOfMeasurement}
            </Text>
          )}
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
