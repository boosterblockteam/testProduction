"use client";
import React from "react";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import { useTranslations } from "next-intl";
import { DataCommissions } from "./moskData";

type Props = {
  dataListCommissions: DataCommissions[];
};

const Commissions = ({ dataListCommissions }: Props) => {
  const t = useTranslations();

  const numberByPage = 8;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: dataListCommissions as DataCommissions[],
    numberByPage: numberByPage,
  });

  return (
    <div className="mt-4">
      <div className={`px-[24px]`}>
        {elemetsVisibleByPage.length > 0 ? (
          <>
            <div className="component rounded-[16px] p-4 bg-[#ffffff14] text-white">
              {elemetsVisibleByPage.map((commission) => (
                <div
                  key={commission.id}
                  className="container-map flex justify-between items-center border-b border-solid border-[#ffffff1a] pb-[14px] pt-[14px] first:pt-0 last:border-0 last:pb-0"
                >
                  <div className="container-type">
                    <div className="flex text-[14px] font-bold">
                      <p>${commission.amount}</p>
                      <p className="ml-4 rounded-[20px] bg-[#ffffff1a] px-2 py-[2px]">{commission.membership} </p>
                    </div>
                    <span className="text-[12px] text-[#A9AEB4]">{commission.date}</span>
                  </div>
                  <div className="container-amount text-end">
                    <p className="text-[14px]">{commission.userName}</p>
                    <span className="text-[12px] text-[#A9AEB4]">
                      {t("Level")} {commission.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 ">
              <Pagination
                currentPage={currentPage}
                goToNextPage={goToNextPage}
                goToPage={goToPage}
                goToPreviousPage={goToPreviousPage}
                totalPages={totalPages}
              />
            </div>
          </>
        ) : (
          <h1 className="text-white font-bold text-[18px] text-center">{t("No commissions data")}</h1>
        )}
      </div>
    </div>
  );
};

export default Commissions;
