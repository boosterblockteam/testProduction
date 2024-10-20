"use client";
import React, { useState } from "react";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import { useTranslations } from "next-intl";
import { ProfitHistoryOperations } from "./mockData";

interface Props {
  dataOperationsHistory: ProfitHistoryOperations[];
}

const ShortListOperations = ({ dataOperationsHistory }: Props) => {
  const t = useTranslations();

  const [operationsHistory, setOperationsHistory] = useState(dataOperationsHistory);

  const numberByPage = 4;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: operationsHistory,
    numberByPage: numberByPage,
  });

  return (
    <div className="container-down">
      <div className="text-white ">
        <div>
          {elemetsVisibleByPage.length > 0 ? (
            <>
              <div className="container-info px-4 rounded-[20px] bg-[#ffffff14]">
                {elemetsVisibleByPage.map((item) => (
                  <div
                    className="container-info-user flex items-center justify-between py-[16px] border-b border-solid border-[#ffffff14]"
                    key={item.id}
                  >
                    <div className="container-left">
                      <p className="text-[16px] font-bold mb-1">{item.month}</p>
                      <p className="text-[12px]">{item.year}</p>
                    </div>
                    <div className="container-right">
                      <p className={`text-[14px]  font-bold mb-1 ${item.performance >= 0 ? "text-[#20DABB]" : "text-[#FF4C5A]"}`}>
                        {item.performance === 0 ? t("Development").toUpperCase() : `${item.performance}% ${t("Profit")}`}
                      </p>
                      {/* <p className={`text-[14px] font-bold`}>
                        {item.myShare}% {t("My Share")}
                      </p> */}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-5 ">
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
            <p className="text-white font-bold text-[18px] text-center">{t("There is no profit history")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortListOperations;
