"use client";
import React from "react";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { Membership } from "../types/membership";
import { formatCurrencyInteger } from "@/utils/formatCurrency";

interface PlansMembership {
  plan: string;
  price: string | number;
  minStake: string;
  maxStake: string;
  fee: any;
  expiration: number;
  performanceFee: number;
}

interface Props {
  card: Membership;
  selectedPlan: Membership;
  setSelectedPlan: React.Dispatch<React.SetStateAction<Membership>>;
}

const CardPlanData = ({ card, selectedPlan, setSelectedPlan }: Props) => {
  const t = useTranslations();
  const removeSingleQuotes = (str) => str.replace(/'/g, "");

  const handleSelectPlan = (plan: Membership) => {
    setSelectedPlan(plan);
  };

  return (
    <div className={` bg-white pb-4 text-[#1E0E39] rounded-[20px] min-w-[262px] w-full h-[288px] flex flex-col justify-between`}>
      <div>
        <div className={`${selectedPlan?.plan === card.plan ? "bg-[#7A2FF4]" : "bg-[#554D77]"}  text-white px-4  py-2 rounded-t-[20px] text-center`}>
          <h2 className="text-[20px] font-bold mb-2">{removeSingleQuotes(card.plan)}</h2>
          <p className="text-[16px]">{card.price == 0 ? t("FREE") : `$${card.price}`}</p>
        </div>
        <div className=" p-4 rounded-b-[20px] text-[14px]">
          <div className="flex justify-between border-b border-solid border-[#F2F3F8] pb-2 ">
            <span>{t("Min Stake")}</span>
            <span className="font-bold">${formatCurrencyInteger(card.minStake)}</span>
          </div>
          <div className="flex justify-between border-b border-solid border-[#F2F3F8] py-2">
            <span>{t("Max Stake")}</span>
            <span className="font-bold">${formatCurrencyInteger(card.maxStake)}</span>
          </div>
          <div className="flex justify-between border-b border-solid border-[#F2F3F8] py-2">
            <span>{t("Fee")}</span>
            <span className="font-bold">{card.fee}%</span>
          </div>
          <div className="flex justify-between py-2">
            <span>{t("Performance Fee")}</span>
            <span className="font-bold">{card.performanceFee}%</span>
          </div>
          {card.price == 0 ? null : (
            <div className="flex justify-between border-t border-solid border-[#F2F3F8] py-2">
              <span>{t("Expiration")}</span>
              <span className="font-bold">
                {card.expiration} {t("days")}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 w-[200px]">
        {selectedPlan?.plan === card.plan ? (
          <ButtonPrimary text={t("Selected Plan")} />
        ) : (
          <ButtonSecondary text={t("Select Plan")} onClickFn={() => handleSelectPlan(card)} />
        )}
      </div>
    </div>
  );
};

export default CardPlanData;
