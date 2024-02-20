import { ACCESS_TOKEN } from "@env";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

import { EntityMapping } from "@/types/device";
import {
  ReceivedEvent,
  ReceivedEventAll,
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

export const parseEventAll = (
  message: ReceivedEventAll,
  entities: EntityMapping,
  setEntities: Dispatch<SetStateAction<EntityMapping>>,
) => {
  const receivedEntities = Object.entries(message.event.a);

  let newEntities: EntityMapping = entities;

  receivedEntities.map((rcvEntity) => {
    const entityId = rcvEntity[0];
    const value = rcvEntity[1].s;
    const attributes = rcvEntity[1].a;

    const entity = entities[entityId];
    entity.state.value = value;
    entity.state.attributes = attributes;

    newEntities = { ...newEntities, [entityId]: entity };
  });

  setEntities(newEntities);
};

export const subscribeEntities = (
  ws: MutableRefObject<WebSocket | undefined>,
  entityIds: string[],
  wsId: number,
  setWsId: Dispatch<SetStateAction<number>>,
) => {
  ws.current?.send(
    JSON.stringify({
      id: wsId,
      type: "subscribe_entities",
      entity_ids: entityIds,
    }),
  );
  setWsId(wsId + 1);
};

export const parseServiceResponse = (message: ServiceResponse) => {
  console.log("Not implemented");
};
