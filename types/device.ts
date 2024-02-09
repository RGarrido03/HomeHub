import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type State = {
  value: boolean | number | string;
  attributes?: object;
};

type Action = {
  service: string;
  target: "on" | "off";
};

export type Entity = {
  id: string;
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
  primaryEntity: Entity;
  secondaryEntities?: Entity[];
};