"use client";
import React from "react";
import CurrentPlan from "./components/CurrentPlan";
import { usePathname } from "next/navigation";
import SelectMember from "./selectMember/page";
import { useTranslations } from "next-intl";
import { DataCurrentPlan } from "./components/moskData";
import Navbar from "@/app/components/generals/Navbar";
import MembersHeader from "./components/MembersHeader";

type Props = {
  dataListCurrents: DataCurrentPlan[];
};

const Members = ({ dataListCurrents }: Props) => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div>
      {pathname === "/members/selectMember" ? (
        <SelectMember />
      ) : (
        <div className="pb-[88px] pt-[390px] min-h-screen ">
          <div className="rounded-b-[40px] px-6 py-4 bg-gradient-to-t from-[#0E0E33] to-[#39307B] fixed top-0 z-50 w-full lg:max-w-[360px] lg:mx-auto">
            <Navbar text={t("Membership")} />
            <MembersHeader />
          </div>
          <CurrentPlan dataListCurrents={dataListCurrents} />
        </div>
      )}
    </div>
  );
};

export default Members;
