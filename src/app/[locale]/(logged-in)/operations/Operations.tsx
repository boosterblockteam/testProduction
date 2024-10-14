"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/generals/Navbar";
import { useTranslations } from "next-intl";
import TotalValueLockedHeader from "./components/TotalValueLocked";
import LinealChart from "@/app/components/generals/charts/ChartLines";
import ShortListOperations from "./components/ShortListOperations";
import AllOperations from "./components/AllOperations";
import GoBackSVG from "@/assets/icons/GoBackIcon";
import Link from "next/link";
import Image from "next/image";
import ContainerLanguage from "@/app/components/generals/ContainerLanguage";
import NotificationsSVG from "@/assets/icons/NotificationsIcon";
import AccountSVG from "@/assets/icons/Door.svg";
import SupportSVG from "@/assets/icons/Support.svg";
import { useRouter } from "next/navigation";

const Operations = ({ dataOperationsHistory }) => {
  const t = useTranslations();
  const router = useRouter();
  const [stepNft, setStepNft] = useState<number>(1);

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] flex flex-col justify-between min-h-screen pt-4 pb-[88px] px-6">
      <div>
        {stepNft === 1 ? (
          <Navbar text={t("Operations")} />
        ) : (
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center cursor-pointer " onClick={() => setStepNft(1)}>
              <GoBackSVG width={20} height={20} />
              <h2 className="text-white text-[16px] font-bold">{t("Operations")}</h2>
            </div>

            <div className="container-language-notifications flex items-center justify-between w-[128px]">
              <Link href={`/accountLogin`} className="cursor-pointer">
                <Image src={AccountSVG} alt="icon" width={20} height={20} />
              </Link>
              <Link href={`/support`} className="cursor-pointer">
                <Image src={SupportSVG} alt="icon" width={20} height={20} />
              </Link>

              <ContainerLanguage />
              <NotificationsSVG fill="#fff" width={20} height={20} onClick={() => router.push("/notifications")} />
            </div>
          </div>
        )}

        {stepNft === 1 ? (
          <>
            <TotalValueLockedHeader />

            <div className="mt-2 bg-white rounded-[20px]">
              <LinealChart />
            </div>

            <div className="my-4 flex justify-between items-center">
              <h1 className="text-white text-[20px] font-bold ">{t("Operations History")}</h1>
              <button
                className="p-2 text-white bgGradientPurpleMedium hover:bg-gradient-to-t from-[#7a2ff4] to-[#7a2ff4] rounded-[10px] cursor-pointer text-[12px] font-bold w-[75px]"
                onClick={() => setStepNft(2)}
              >
                {t("See More")}
              </button>
            </div>

            <ShortListOperations dataOperationsHistory={dataOperationsHistory} />
          </>
        ) : (
          <AllOperations dataOperationsHistory={dataOperationsHistory} />
        )}
      </div>
    </div>
  );
};

export default Operations;
