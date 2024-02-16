import {
  AuthOk,
  AuthRequired,
  FetchedStateResponse,
  ReceivedEvent,
  ServiceResponse,
} from "@/types/socket";

export const isMessageAuthRequired = (message: any): message is AuthRequired =>
  message?.type === "auth_required";

export const isMessageAuthOk = (message: any): message is AuthOk =>
  message?.type === "auth_ok";

export const isMessageReceivedEvent = (
  message: any,
): message is ReceivedEvent => message?.type === "event";

export const isMessageFetchedStateResponse = (
  message: any,
): message is FetchedStateResponse =>
  message?.type === "result" && typeof message.result.entity_id === "string";

export const isMessageServiceResponse = (
  message: any,
): message is ServiceResponse =>
  message?.type === "result" && typeof message.result.entity_id === "undefined";
