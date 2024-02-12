export type WsState = {
  connected: boolean;
  auth: boolean;
  subscribed: boolean;
  ack: boolean;
};

type Message = {
  type: string;
};

type Auth = Message & {
  ha_version?: string;
  hassUrl?: string;
  authCode?: string;
};

type Result = Message & {
  id: number;
  type: "result";
  success: boolean;
  result: null;
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
