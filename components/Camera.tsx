import { JSX, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
  RTCPeerConnection,
  RTCRtpReceiver,
  RTCView,
} from "react-native-webrtc";
import { RTCSessionDescriptionInit } from "react-native-webrtc/lib/typescript/RTCSessionDescription";
import RTCTrackEvent from "react-native-webrtc/lib/typescript/RTCTrackEvent";

import { notEmpty } from "@/utils/arrays";

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  sdpSemantics: "unified-plan", // important for Chromecast 1
};

export default function Camera(): JSX.Element {
  const [localMediaStream, setLocalMediaStream] = useState<MediaStream>();
  const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream>();
  const ws = useRef<WebSocket>();
  const [pc, setPc] = useState<RTCPeerConnection>(new RTCPeerConnection());

  useEffect(() => {
    ws.current = new WebSocket(
      "wss://go2rtc.internal.garridoegarridolda.pt/api/ws?src=camera.reolink_doorbell",
    );

    ws.current.onmessage = (msg) => {
      switch (msg.type) {
        case "webrtc/candidate":
          pc.addIceCandidate({ candidate: msg.data, sdpMid: "0" }).catch(
            (er) => {
              console.warn(er);
            },
          );
          break;
        case "webrtc/answer":
          pc.setRemoteDescription({ type: "answer", sdp: msg.data }).catch(
            (er) => {
              console.warn(er);
            },
          );
          break;
        case "error":
          if (msg.data.indexOf("webrtc/offer") < 0) return;
          pc.close();
      }
    };
  }, []);

  const send = (value: object) => {
    ws.current?.send(JSON.stringify(value));
  };

  const createOffer = async (
    pc: RTCPeerConnection,
  ): Promise<RTCSessionDescriptionInit> => {
    try {
      const media = await mediaDevices.getUserMedia({
        audio: true,
      });
      media.getTracks().forEach((track: MediaStreamTrack) => {
        pc.addTransceiver(track, { direction: "sendonly" });
      });
    } catch (e) {
      console.warn(e);
    }

    pc.addTransceiver("video", { direction: "recvonly" });
    pc.addTransceiver("audio", { direction: "sendrecv" });

    const offer = await pc.createOffer({
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToSendAudio: true,
        OfferToReceiveVideo: true,
        VoiceActivityDetection: true,
      },
    });
    await pc.setLocalDescription(offer);
    return offer;
  };

  const deviceLogic = async () => {
    const mediaConstraints = {
      audio: true,
      video: {
        frameRate: 30,
        facingMode: "environment",
      },
    };

    const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);
    const videoTrack = mediaStream.getVideoTracks()[0];
    videoTrack.enabled = true;
    setLocalMediaStream(mediaStream);

    // ---------------------

    const peerConstraints: RTCConfiguration = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };

    setPc(new RTCPeerConnection(peerConstraints));

    pc.addEventListener("connectionstatechange", (event) => {
      switch (pc.connectionState) {
        case "connected":
          console.log("Connected");

          setRemoteMediaStream(
            new MediaStream(
              pc
                .getReceivers()
                .map((receiver: RTCRtpReceiver) => receiver.track)
                .filter(notEmpty),
            ),
          );
          break;
        case "disconnected":
        case "failed":
          pc.close();
          break;
        case "closed":
          console.log("Connection closed");
          break;
      }
    });

    pc.addEventListener("icecandidate", (event) => {
      const candidate = event.candidate
        ? event.candidate.toJSON().candidate
        : "";
      send({ type: "webrtc/candidate", value: candidate });
    });

    pc.addEventListener("icecandidateerror", (event) => {
      console.log("icecandidateerror", event.candidate, event.type);
      // You can ignore some candidate errors.
      // Connections can still be made even when errors occur.
    });

    pc.addEventListener("iceconnectionstatechange", (event) => {
      switch (pc.iceConnectionState) {
        case "connected":
        case "completed":
          // You can handle the call being connected here.
          // Like setting the video streams to visible.

          break;
      }
    });

    pc.addEventListener("negotiationneeded", (event) => {
      console.log("Connection negotiation needed. Offering...");
      createOffer(pc).then((offerDescription) => {
        send({ type: "webrtc/offer", value: offerDescription.sdp });
        pc.setRemoteDescription(offerDescription);
      });
      // You can start the offer stages here.
      // Be careful as this event can be called multiple times.
    });

    pc.addEventListener("signalingstatechange", (event) => {
      switch (pc.signalingState) {
        case "closed":
          // You can handle the call being disconnected here.
          console.log("Connection closed");
          break;
      }
    });

    pc.addEventListener("track", (event: RTCTrackEvent<"track">) => {
      // Grab the remote track from the connected participant.
      console.log("Track event", event);
      const a = new MediaStream();
      event.track && a.addTrack(event.track);
      setRemoteMediaStream(a);
    });

    // Add our stream to the peer connection.
    localMediaStream
      ?.getTracks()
      .forEach((track) => pc.addTrack(track, localMediaStream));
  };

  useEffect(() => {
    deviceLogic();
  }, []);

  return (
    <RTCView
      objectFit="cover"
      streamURL={remoteMediaStream?.toURL()}
      style={styles.view}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
