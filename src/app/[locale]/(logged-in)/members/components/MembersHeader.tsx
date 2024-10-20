"use client";
import React, { useState } from "react";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";

import Link from "next/link";
import Image from "next/image";
import CommissionsSVG from "@/assets/icons/membersComitions.svg";
import { useBalance } from "@/app/components/web3/hooks/useBalance";
import { formatCurrencyInteger } from "@/utils/formatCurrency";
import { useRewards } from "@/app/components/web3/hooks/useRewards";
import { useClaim } from "@/app/components/web3/hooks/useClaim";

const MembersHeader = () => {
  const t = useTranslations();

  const [totalVolume, setTotalVolume] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [aviableToClaim, setAviableToClaim] = useState(0);
  const [paidRewards, setPaidRewards] = useState(0);
  const [teamMembers, setTeamMembers] = useState(0);

  const { balance } = useBalance();
  const { memberProfit, memberPayedProfit } = useRewards();
  const {  claimDirectBonus } = useClaim();

  const buttonClaimModal = async () => {
    console.log("buttonClaimModal");
    const { errors: errorsClaimDirectBonus } = await claimDirectBonus();
    if (errorsClaimDirectBonus) {
      console.log(errorsClaimDirectBonus);
      return;
    }
  };

  return (
    <div className="members-header">
      <div className="container p-2 rounded-[16px] border-solid border-[1.2px] border-[#7A2FF4] relative">
        <Link
          href="/member?type=commissions"
          className="rounded-[5px] absolute top-4 right-4 border border-solid border-white bg-[#ffffff1a] cursor-pointer"
        >
          <Image src={CommissionsSVG} alt="icon" width={24} height={24} />
        </Link>
        <div className="container-totalStaked rounded-[10px] bg-[#7A2FF4] p-6 text-white text-center">
          <p className="text-[14px]">{t("Wallet Balance")}</p>
          <p className="text-[24px] font-bold mb-2">$ {formatCurrencyInteger(balance)} </p>
        </div>
        <div className="container-members-estimated mt-2 flex justify-between items-center text-center text-[#7A2FF4] space-x-2">
          <div className="container-MyMembers bg-[#F2F3F8] flex flex-col justify-center items-center rounded-[10px] py-2 px-4 w-2/4 h-[75px]">
            <p className="text-[14px]">{t("Available to Claim")}</p>
            <p className="text-[16px] font-bold mt-1">$ {memberProfit}</p>
          </div>
          <div className="container-totalStaked bg-[#F2F3F8] flex flex-col justify-center items-center rounded-[10px] py-2 px-4 w-2/4 h-[75px]">
            <p className="text-[14px]">{t("Paid Rewards")}</p>
            <p className="text-[16px] font-bold mt-1">$ {memberPayedProfit}</p>
          </div>
        </div>
        <div className="container-members-estimated mt-2 flex justify-between items-center text-center text-[#7A2FF4] space-x-2 mb-2">
          <div className="container-MyMembers bg-[#F2F3F8] flex flex-col justify-center items-center rounded-[10px] py-2 px-4 w-2/4 h-[75px]">
            <p className="text-[14px]">{t("Team Members")}</p>
            <p className="text-[16px] font-bold mt-1">{teamMembers}</p>
          </div>
          <div className="container-totalStaked bg-[#F2F3F8] flex flex-col justify-center items-center rounded-[10px] py-2 px-4 w-2/4 h-[75px]">
            <p className="text-[14px]">{t("Total Volume")}</p>
            <p className="text-[16px] font-bold mt-1">$ {totalVolume / 1000000}</p>
          </div>
        </div>
        <ButtonPrimary text={t("Claim Rewards")} onClickFn={buttonClaimModal} />
      </div>
    </div>
  );
};

export default MembersHeader;
