"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const TotalValueLockedHeader = () => {
  const t = useTranslations();
  const [totalValueLocked, setTotalValueLocked] = useState<string>("2,300,000");

  return (
    <div className="p-2 rounded-[20px] border-solid border-[1px] border-[#AD98FF] mb-4">
      <div className="text-white bg-[#7A2FF4] py-4 px-2 rounded-[10px] text-center">
        <p className="mb-2 text-[14px]">{t("Total Value Locked")}</p>
        <p className="text-[24px] font-bold">
          $ {totalValueLocked}
          <span className="text-[14px]">.00</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 my-2">
        <div className="bg-white text-[#7A2FF4] text-[14px] text-center p-2 rounded-[10px] flex flex-col flex-grow justify-between items-center basis-[140px] h-[80px]">
          <p>{t("Total Profits")}</p>
          <p className="font-bold text-[16px]">$ 2,000</p>
          <p className="text-[#554D77] font-bold">7.98%</p>
        </div>
        <div className="bg-white text-[#7A2FF4] text-[14px] text-center p-2 rounded-[10px] flex flex-col flex-grow justify-between items-center basis-[140px] h-[80px]">
          <p>{t("Profit Claimed")}</p>
          <p className="font-bold text-[16px]">$ 100,000</p>
          <p className="text-[#554D77] font-bold">54.51%</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="bg-[#11BDA0] text-white text-[14px] text-center p-2 rounded-[10px] flex flex-col flex-grow justify-between items-center basis-[140px] h-[80px]">
          <p>{t("Total Wons")}</p>
          <p className="font-bold text-[16px]">22 (78.57%)</p>
          <p className="font-bold">$229,469 (9.98%)</p>
        </div>
        <div className="bg-[#FF4C5A] text-white text-[14px] text-center p-2 rounded-[10px] flex flex-col flex-grow justify-between items-center basis-[140px] h-[80px]">
          <p>{t("Total Lost")}</p>
          <p className="font-bold text-[16px]">6 (21.43%)</p>
          <p className="font-bold">$46,000 (2%)</p>
        </div>
      </div>
    </div>
  );
};

export default TotalValueLockedHeader;
