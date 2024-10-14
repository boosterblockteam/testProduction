"use client";
import React, { useState } from "react";
import CardAllOperations from "./CardAllOperations";
import { useTranslations } from "next-intl";
import SelectBtnPurple from "@/app/components/generals/SelectBtnPurple";
import { ProfitHistoryOperations } from "./mockData";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";

type Props = {
  dataOperationsHistory: ProfitHistoryOperations[];
};

const AllOperations = ({ dataOperationsHistory }: Props) => {
  const t = useTranslations();
  const options = [t("All"), t("Open"), t("Closed")];
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const numberByPage = 8;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: dataOperationsHistory,
    numberByPage: numberByPage,
  });

  return elemetsVisibleByPage.length > 0 ? (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-white text-[14px] font-bold leading-3">{t("Operations Transactions History")}</h1>
        <SelectBtnPurple
          title={t("Select Type")}
          selectedOptionSeason={selectedOption}
          setSelectedOptionSeason={setSelectedOption}
          optionsSeason={options}
        />
      </div>

      {elemetsVisibleByPage.map((item) => (
        <CardAllOperations key={item.id} dataCard={item} />
      ))}
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
    <h1 className="text-white font-bold text-[18px] text-center">{t("No Operations Transactions History")}</h1>
  );
};

export default AllOperations;
