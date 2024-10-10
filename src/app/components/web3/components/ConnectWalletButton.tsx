"use client";
import React from "react";
import "@/app/components/web3/styles/ConnectButton.css";
import {
  ConnectButton,
  darkTheme,
  LocaleId,
} from "thirdweb/react";
import {
  polygon,
} from "thirdweb/chains";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

import { client } from "../client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "telegram",
        "email",
        "passkey",
        "phone",
        "apple",
        "facebook",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.trustwallet.app"),
  createWallet("com.binance"),
];

export const connectButtonOptions = {
  wallets: wallets,
  chain: polygon,
  connectModal: {
    size: "compact",
    title: "DeFily Wallet",
    titleIcon:
      "https://ipfs.io/ipfs/QmcZCJHmcZQiw3QEso1R8gLS3UKh9VrKNwhmsFrr3tGR8g",
    showThirdwebBranding: false,
    termsOfServiceUrl:
      "https://www.defily.ai/terminosYCondiciones",
  },
  appMetadata: {
    name: "Defily Wallet",
    url: "https://defily.ai",
    logoUrl: "https://dapp.defily.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoInitial.eee4a987.gif&w=128&q=75",
  },
  theme: darkTheme({
    colors: {
      modalBg: "#0f0f33",
      tooltipBg: "#ffffff",
      primaryText: "#ffffff",
      primaryButtonBg: "#0f0f33",
      primaryButtonText: "#ffffff",
    },
  }),
} as const;


const ConnectWalletButton = () => {

  const t = useTranslations();

  const router = useRouter();

  return (
    <>
      <ConnectButton
        client={client}
        {...connectButtonOptions}
        onDisconnect={() => router.push("/welcome")}
        connectButton={{ label: t("Connect Wallet") }}
        locale={t("locale") as LocaleId}
      />
    </>
  );
};

export default ConnectWalletButton;
