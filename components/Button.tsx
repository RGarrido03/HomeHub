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

import { Action } from "@/types/device";
import { WsState } from "@/types/socket";

type ButtonProps = {
  title: string;
  value: string | number;
  icon?: keyof typeof MaterialIcons.glyphMap;
  unitOfMeasurement: string | undefined;
  action: Action | undefined;
  ws: WebSocket | undefined;
  wsState: WsState;
  setWsState: Dispatch<SetStateAction<WsState>>;
};

export default function Button({
  title,
  value,
  icon,
  unitOfMeasurement,
  action,
  ws,
  wsState,
  setWsState,
}: ButtonProps) {
  const theme: ColorSchemeName = useColorScheme();

  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => {
        if (action && ws) {
          ws.send(
            JSON.stringify({
              type: "call_service",
              domain: action.domain,
              service: action.service,
              service_data: action.data,
              id: wsState.id,
            }),
          );
          setWsState((st) => ({ ...st, id: st.id + 1 }));
          return;
        }
        console.log(`No action or WebSocket is configured for ${title}`);
      }}
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
