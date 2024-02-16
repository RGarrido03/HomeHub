export type WsState = {
  connected: boolean;
  auth: boolean;
  subscribed: boolean;
  ack: boolean;
  id: number;
};

type Message = {
  type: string;
};

export type AuthRequired = Message & {
  type: "auth_required";
  ha_version: string;
};

export type AuthOk = Message & {
  type: "auth_ok";
  ha_version: string;
};

export type ReceivedEvent = Message & {
  id: number;
  type: "event";
  event: {
    c: {
      [key: string]: {
        "+": {
          c: string; // ?
          lc: number; // Timestamp
          s: string; // Value
        };
      };
    };
  };
};

type Result = Message & {
  id: number;
  type: "result";
  success: boolean;
};

type ReceivedState = {
  entity_id: string;
  state: number | string;
  attributes?: { [key: string]: string | string[] };
  last_changed: Date;
  last_updated: Date;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
};

export type FetchedStateResponse = Result & {
  result: ReceivedState[];
};

export type ServiceResponse = Result & {
  result: {
    context: {
      id: string;
      parent_id: string | null;
      user_id: string | null;
    };
  };
};
