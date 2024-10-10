"use client";
import React, { useEffect } from "react";
import ConnectWalletButton from "../web3/components/ConnectWalletButton";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";

const InfoWalletNFT = () => {

  // const account = useActiveAccount();

  // if (!account) {
  //   return <></>;
  // }

  return (
    <div className="info-wallet-nft">
      <ConnectWalletButton />
    </div>
  );
};

export default InfoWalletNFT;
