"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useGetReferral } from "@/app/components/web3/hooks/useGetReferral";
import { ClipLoader } from "react-spinners";

interface Props {
  classContainer?: string;
  classKey?: string;
  classValor?: string;
}

const SponsorData = ({ classContainer, classKey, classValor }: Props) => {
  const t = useTranslations();
  const params = useSearchParams();
  const referral = params.get("sponsor") || "0";

  const {
    referralName,
    referralNumber,
    isLoadingGettingReferral
  } = useGetReferral(Number(referral));

  return (
    <div className={`${classContainer ? classContainer : "mx-6 mt-6 bg-[#ffffff1a] rounded-[8px] flex justify-between items-center py-2 px-4"}`}>
      <p className={`${classKey ? classKey : "text-[14px] font-bold text-[#A9AEB4]"} `}>{t("My Sponsor")}</p>
      <div>
        <p className={`${classValor ? classValor : "text-[14px] text-white font-bold"}`}>
          <span className="text-[12px] font-bold py-[1px] px-[6px] rounded bg-[#ffffff1a] mr-1">{referralNumber}</span>
          {" "}
          {<ClipLoader color="#00B96B" loading={isLoadingGettingReferral} size={10} />}
          {referralName}
        </p>
      </div>
    </div>
  );
};

export default SponsorData;
