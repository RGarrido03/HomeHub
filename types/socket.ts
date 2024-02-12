export type WsState = {
  connected: boolean;
  auth: boolean;
  subscribed: boolean;
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

type State = {
  entity_id: string;
  last_changed: Date;
  state: string;
  attributes?: any;
  last_updated: Date;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string;
  };
};

export type ReceivedEvent = Message & {
  id: number;
  type: "event";
  event: {
    data: {
      entity_id: string;
      new_state: State;
      old_state?: State;
    };
    event_type: "state_changed";
    time_fired: Date;
    origin: string;
    context: {
      id: string;
      parent_id: string | null;
      user_id: string;
    };
  };
};
