"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { ProfitHistoryMyLiquidity, InfoMembership, DataOperationsUnStake } from "./components/MockData";
import { useTranslations } from "next-intl";
import Navbar from "@/app/components/generals/Navbar";
import HeaderStakes from "./components/HeaderStakes";
import Stake from "./components/Stake";
import MyStakes from "./components/MyStakes";
import UnStake from "./components/UnStake";

interface Props {
  dataMyStakes: ProfitHistoryMyLiquidity[];
  infoMembership: InfoMembership[];
  dataUnStake: DataOperationsUnStake[];
}

const Stakes = ({ dataMyStakes, infoMembership, dataUnStake }: Props) => {
  const t = useTranslations();
  const search = useSearchParams().get("type");

  return (
    <div className="pt-[127px]">
      <div className="rounded-b-[40px] px-6 py-4 bg-gradient-to-t from-[#0E0E33] to-[#39307B] fixed top-0 z-50 w-full">
        <Navbar text={t("Stakes")} />
        <HeaderStakes type={search} />
      </div>

      {search === "stake" ? <Stake /> : ""}
      {search === "myStakes" ? <MyStakes dataMyStakes={dataMyStakes} infoMembership={infoMembership} /> : ""}
      {search === "un-stake" ? <UnStake dataUnStake={dataUnStake} /> : ""}
    </div>
  );
};

export default Stakes;
