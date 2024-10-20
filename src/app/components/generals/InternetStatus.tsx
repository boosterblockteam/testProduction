"use client";
import { useState, useEffect } from "react";
import WifiOnline from "@/assets/icons/wifi-full.svg";
import WifiUnstable from "@/assets/icons/wifiUnstable.svg";
import WifiVeryUnstable from "@/assets/icons/wifiVeryUnstable.svg";
import WifiOffline from "@/assets/icons/wifiOffline.svg";
import Image from "next/image";

type ConnectionStatus = "online" | "offline" | "unstable" | "very-unstable";

const InternetStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>("online");

  useEffect(() => {
    const checkConnection = () => {
      if (!navigator.onLine) {
        setStatus("offline");
        return;
      }

      // Check connection quality if the API is available
      if ("connection" in navigator && "effectiveType" in (navigator as any).connection) {
        const connection = (navigator as any).connection;
        if (connection.effectiveType === "4g") {
          setStatus("online");
        } else if (connection.effectiveType === "3g") {
          setStatus("unstable");
        } else {
          setStatus("very-unstable");
        }
      } else {
        // If the API is not available, just set as online
        setStatus("online");
      }
    };

    // Check initial status
    checkConnection();

    // Add event listeners
    window.addEventListener("online", () => checkConnection());
    window.addEventListener("offline", () => setStatus("offline"));

    // If available, listen for connection changes
    if ("connection" in navigator) {
      (navigator as any).connection.addEventListener("change", checkConnection);
    }

    // Cleanup function
    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", () => setStatus("offline"));
      if ("connection" in navigator) {
        (navigator as any).connection.removeEventListener("change", checkConnection);
      }
    };
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-[#11BDA0]";
      case "unstable":
        return "bg-[#FFCD1B]";
      case "very-unstable":
        return "bg-[#FF8C22]";
      case "offline":
        return "bg-[#FF4C5A]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <button className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor()}`} onClick={() => {}}>
      {status === "online" && <Image src={WifiOnline} alt="icon" />}
      {status === "unstable" && <Image src={WifiUnstable} alt="icon" />}
      {status === "very-unstable" && <Image src={WifiVeryUnstable} alt="icon" />}
      {status === "offline" && <Image src={WifiOffline} alt="icon" />}
    </button>
  );
};

export default InternetStatus;
