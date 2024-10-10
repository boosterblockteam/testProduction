"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useBalance } from "@/app/components/web3/hooks/useBalance";
import { formatCurrencyInteger } from "@/utils/formatCurrency";
import { useRewards } from "@/app/components/web3/hooks/useRewards";
import { useClaim } from "@/app/components/web3/hooks/useClaim";

const WalletBalance = () => {
  const t = useTranslations();
  const { balance } = useBalance();
  const { nftProfit,nftPayedProfit } = useRewards();
  const { claimBonusNft } = useClaim();



  const buttonClaimRewards = async() => {
    console.log("buttonClaimRewards")
    const { errors: errorsClaimBonusNft } = await claimBonusNft();
    if (errorsClaimBonusNft) {
      console.log(errorsClaimBonusNft);
     
      return;
    }
  };

  useEffect(() => {
    console.log(balance)
  }, [balance])
  


  return (
    <div className="p-2 rounded-[20px] border-solid border-[1px] border-[#AD98FF] mb-4">
      <div className="text-white bg-[#7A2FF4] py-4 px-2 rounded-[10px] text-center">
        <p className="mb-2 text-[14px]">{t("Wallet Balance")}</p>
        <p className="text-[24px] font-bold">
          $ {`${isNaN(balance) ? "0" : formatCurrencyInteger(balance)}`}
          {/* <span className="text-[14px]">.00</span> */}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 my-2">
        <div className="bg-white text-[#554D77] text-[14px] text-center p-2 rounded-[10px] flex flex-col flex-grow justify-center items-center basis-[140px] h-[74px]">
          <p>{t("Total Claimed")}</p>
          <p className="font-bold text-[16px] mt-1">$ {formatCurrencyInteger(nftPayedProfit)}</p>
        </div>
        <div className="bg-white text-[#7A2FF4] text-[14px] text-center p-2 rounded-[10px] flex flex-col flex-grow justify-center items-center basis-[140px] h-[74px]">
          <p>{t("Available to Claim")}</p>
          <p className="font-bold text-[16px] mt-1">$ {formatCurrencyInteger(nftProfit)}</p>
        </div>
      </div>

      <ButtonPrimary text={t("Claim Rewards")} onClickFn={buttonClaimRewards} />
    </div>
  );
};

export default WalletBalance;
