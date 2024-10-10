"use client";

import { useEffect, useState } from "react";
import { nftSelectionSocket } from "./socket";
import { Socket } from "socket.io-client";

export const useNFTSelectionSocket = (): {
  isConnected: boolean;
  transport: string;
  nftSelectionSocket: Socket;
} => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (nftSelectionSocket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(nftSelectionSocket.io.engine.transport.name);

      nftSelectionSocket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    nftSelectionSocket.on("connect", onConnect);
    nftSelectionSocket.on("disconnect", onDisconnect);

    return () => {
      nftSelectionSocket.off("connect", onConnect);
      nftSelectionSocket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    isConnected,
    transport,
    nftSelectionSocket,
  };

}