"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const HeaderStakes = ({ type }: { type?: any }) => {
  const t = useTranslations();
  const router = useRouter();
  const search = useSearchParams().get("type");

  const buttomHandleSearch = () => {
    const searchParams = new URLSearchParams({ type });
    router.push(`/stakes?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="h-[35px] rounded-[10px] bg-[#ffffff1a] flex items-center justify-between">
        <Link
          href={`/stakes?type=myStakes`}
          className={`w-2/6 flex items-center justify-center cursor-pointer ${
            search === `myStakes` ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full" : "text-[#F2F3F8]"
          }`}
          onClick={buttomHandleSearch}
        >
          <p className=" text-[14px]">{t("My Stakes")}</p>
        </Link>
        <Link
          href={`/stakes?type=stake`}
          className={`w-2/6 flex items-center justify-center cursor-pointer ${
            search === `stake` ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full " : "text-[#F2F3F8]"
          }`}
          onClick={buttomHandleSearch}
        >
          <p className="text-[14px]">{t("Stake")}</p>
        </Link>
        <Link
          href={`/stakes?type=un-stake`}
          className={`w-2/6 flex items-center justify-center cursor-pointer ${
            search === `un-stake` ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full " : "text-[#F2F3F8]"
          }`}
          onClick={buttomHandleSearch}
        >
          <p className="text-[14px]">{t("Un-Stake")}</p>
        </Link>
      </div>
      <div className="mt-4 gap-x-3 flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${search === `myStakes` ? "bg-white" : "bg-[#ffffff40]"}`}></div>
        <div className={`w-2 h-2 rounded-full ${search === `stake` ? "bg-white" : "bg-[#ffffff40]"}`}></div>
        <div className={`w-2 h-2 rounded-full ${search === `un-stake` ? "bg-white" : "bg-[#ffffff40]"}`}></div>
      </div>
    </>
  );
};

export default HeaderStakes;
