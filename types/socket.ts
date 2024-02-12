export type WsState = {
  connected: boolean;
  auth: boolean;
  subscribed: boolean;
  ack: boolean;
};

type Message = {
  type: string;
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
