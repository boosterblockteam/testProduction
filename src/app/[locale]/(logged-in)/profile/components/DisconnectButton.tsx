"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { useDisconnect } from "@thirdweb-dev/react";
import { useTranslations } from "next-intl";

const DisconnectButton = () => {
  const t = useTranslations();
  const router = useRouter();
  const disconnect = useDisconnect();

  const desconecatar = () => {
    disconnect();
    localStorage.removeItem("wallet");
    localStorage.removeItem("idAccount");
    localStorage.removeItem("step1");
    localStorage.removeItem("step2");
    localStorage.removeItem("step3");
    localStorage.removeItem("totalStaking");
    localStorage.removeItem("nftInfo");
    localStorage.removeItem("membershipSelected");
    router.push(`/welcome`);
  };

  return (
    <div onClick={desconecatar}>
      <ButtonSecondary text={t("Log Out")} />
    </div>
  );
};

export default DisconnectButton;
