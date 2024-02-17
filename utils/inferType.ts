import {
  AuthOk,
  AuthRequired,
  ReceivedEvent,
  ReceivedEventAll,
  ServiceResponse,
} from "@/types/socket";

export const isMessageAuthRequired = (message: any): message is AuthRequired =>
  message?.type === "auth_required";

export const isMessageAuthOk = (message: any): message is AuthOk =>
  message?.type === "auth_ok";

export const isMessageReceivedEvent = (
  message: any,
): message is ReceivedEvent =>
  message?.type === "event" && message.event.hasOwnProperty("c");

export const isMessageReceivedEventAll = (
  message: any,
): message is ReceivedEventAll =>
  message?.type === "event" && message.event.hasOwnProperty("a");

export const isMessageServiceResponse = (
  message: any,
): message is ServiceResponse => {
  return (
    message?.type === "result" &&
    message.result !== null &&
    typeof message.result === "object" &&
    message.result.hasOwnProperty("context")
  );
};
