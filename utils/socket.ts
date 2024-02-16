import { ACCESS_TOKEN } from "@env";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

import { EntityMapping } from "@/types/device";
import {
  FetchedStateResponse,
  ReceivedEvent,
  ServiceResponse,
} from "@/types/socket";

export const sendAuth = (ws: MutableRefObject<WebSocket | undefined>) => {
  ws.current?.send(
    JSON.stringify({
      type: "auth",
      access_token: ACCESS_TOKEN,
    }),
  );
};

export const fetchStates = (ws: MutableRefObject<WebSocket | undefined>) => {
  ws.current?.send(
    JSON.stringify({
      id: 1,
      type: "get_states",
    }),
  );
};

export const parseState = (
  message: FetchedStateResponse,
  entityIds: string[],
  entities: EntityMapping,
  setEntities: Dispatch<SetStateAction<EntityMapping>>,
) => {
  message.result.map((state) => {
    if (!entityIds.includes(state.entity_id)) return;

    const entity = entities[state.entity_id];
    entity.state.value = state.state;

    const newEntities: EntityMapping = {
      ...entities,
      [state.entity_id]: entity,
    };

    setEntities(newEntities);
  });
};

export const parseEvent = (
  message: ReceivedEvent,
  entities: EntityMapping,
  setEntities: Dispatch<SetStateAction<EntityMapping>>,
) => {
  const receivedState = Object.entries(message.event.c)[0];
  const entityId = receivedState[0];
  const newValue = receivedState[1]["+"].s;

  const entity = entities[entityId];
  entity.state.value = newValue;

  const newEntities: EntityMapping = {
    ...entities,
    [entityId]: entity,
  };

  setEntities(newEntities);
};

export const subscribeEntities = (
  ws: MutableRefObject<WebSocket | undefined>,
  entityIds: string[],
) => {
  ws.current?.send(
    JSON.stringify({
      id: 2,
      type: "subscribe_entities",
      entity_ids: entityIds,
    }),
  );
};

export const parseServiceResponse = (message: ServiceResponse) => {
  console.log("Not implemented");
};
