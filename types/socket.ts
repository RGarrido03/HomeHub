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

export type ReceivedEventAll = Message & {
  id: number;
  type: "event";
  event: {
    a: {
      [key: string]: {
        c: string; // ?
        lc: number; // Timestamp
        s: string; // Value
        a: {
          // Attributes
          [key: string]: string;
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

export type ServiceResponse = Result & {
  result: {
    context: {
      id: string;
      parent_id: string | null;
      user_id: string | null;
    };
  };
};
