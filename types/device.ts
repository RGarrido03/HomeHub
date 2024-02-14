import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";

type State = {
  value: number | string;
  attributes?: object;
  hidden?: boolean;
  mapping?: {
    [key: string]: string;
  };
};

export type Action = {
  service: string;
  domain: "cover" | "script";
  data: object;
};

export type Entity = {
  name: string;
  type:
    | "sensor"
    | "binary_sensor"
    | "light"
    | "cover"
    | "lock"
    | "script"
    | "switch";
  icon?: keyof typeof MaterialIcons.glyphMap;
  state: State;
  oldState?: State;
  unitOfMeasurement?: string;
  lastRefreshed?: Date;
  action?: Action;
  hidden?: boolean;
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
