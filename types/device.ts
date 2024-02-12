import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";

type State = {
  value: boolean | number | string;
  attributes?: object;
};

type Action = {
  service: string;
  target: "on" | "off";
};

export type Entity = {
  name: string;
  type: "sensor" | "binary_sensor" | "light" | "cover" | "lock";
  icon?: keyof typeof MaterialIcons.glyphMap;
  state: State;
  oldState?: State;
  unitOfMeasurement: string;
  lastRefreshed?: Date;
  action?: Action;
};

export type Device = {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  primaryEntity: string;
  secondaryEntities?: string[];
};

export type EntityMapping = {
  [key: string]: Entity;
};
