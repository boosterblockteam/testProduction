"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useUserPlanStore } from "@/store/user-plan";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import { DataCurrentPlan } from "./moskData";
import Countdown from "../../../../components/generals/Countdown";

type Props = {
  dataListCurrents: DataCurrentPlan[];
};

const CurrentPlan = ({ dataListCurrents }: Props) => {
  const t = useTranslations();
  const { updatePlan, ...plan } = useUserPlanStore();
  const router = useRouter();
  const [membresiaActual, setMembresiaActual] = useState(dataListCurrents);

  const buttonStake = () => {
    console.log("stake");
  };

  return (
    <div className="px-[24px] grid grid-cols-2 gap-x-4">
      {dataListCurrents.length === 0 ? (
        <h1 className="text-[#1E0E39] font-bold text-[18px] text-center w-full col-span-2 mt-6">{t("You currently have no plans")}</h1>
      ) : (
        membresiaActual.map((data, index) => (
          <div className="container py-[16px] px-[10px] rounded-[16px] bg-white shadow-md mt-[24px] border border-solid border-[#AD98FF]" key={index}>
            <div className="mb-2">
              <h1 className={`text-[18px] text-[#7A2FF4] font-bold text-center`}>{data.typePlan.replace(/'/g, "")}</h1>
              <p className="text-[#A9AEB4] text-[10px] font-bold text-center mt-1">$ {parseFloat(data.amount)}</p>
            </div>

            <div className="py-1 flex justify-between items-center border-y border-solid border-[#F2F3F8]">
              <p className="text-[#554D77] text-[10px]">{t("Max Stake")}</p>
              <p className="text-[10px] text-[#A9AEB4] ">${parseFloat(data.maxStake)}</p>
            </div>

            <div className="py-1 flex justify-between items-center border-b border-solid border-[#F2F3F8]">
              <p className="text-[#554D77] text-[10px]">{t("Current Stake")}</p>
              <p className="text-[10px] text-[#A9AEB4]">${parseFloat(data.currentStake)}</p>
            </div>

            <div className="py-1 flex justify-between items-center border-b border-solid border-[#F2F3F8]">
              <p className="text-[#554D77] text-[10px]">{t("Remaining")}</p>
              <p className="text-[10px] text-[#A9AEB4]">${data.remaining}</p>
            </div>

            <div className="py-1 flex justify-between items-center border-b border-solid border-[#F2F3F8]">
              <p className="text-[#554D77] text-[10px]">{t("Start date")}</p>
              <p className="text-[10px] text-[#A9AEB4]">{data.fechaInicio.toLocaleDateString()}</p>
            </div>

            <div className="py-1 flex justify-between items-center border-b border-solid border-[#F2F3F8]">
              <p className="text-[#554D77] text-[10px]">{t("Expiry Date")}</p>
              <p className="text-[10px] text-[#A9AEB4]">{data.fechaFinal.toLocaleDateString()}</p>
            </div>

            <Countdown
              endDate={data.fechaFinal}
              nowDate={new Date()}
            />
            <div className="mt-2">
              <button
                className={`${
                  data.state
                    ? "text-[#AD98FF] border-[1.5px] border-solid border-[#AD98FF] cursor-pointer"
                    : "text-black border-[1.5px] border-solid border-[#A9AEB4] cursor-not-allowed "
                } w-full text-[10px]  font-bold px-4 py-2 rounded-[6px] `}
                onClick={() => {
                  data.state ? buttonStake : null;
                }}
              >
                {t("Stake")}
              </button>
            </div>
          </div>
        ))
      )}

      <div className="col-span-2 mt-4">
        <ButtonPrimary
          text={t("Buy New Membership")}
          onClickFn={() => {
            router.push(`/members/selectMember`);
          }}
        />
      </div>
    </div>
  );
};

export default CurrentPlan;
