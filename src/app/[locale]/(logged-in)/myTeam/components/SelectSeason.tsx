"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  selectedOptionSeason: string;
  setSelectedOptionSeason: (option: string) => void;
  optionsSeason: string[];
}

const SelectSeason = ({ selectedOptionSeason, setSelectedOptionSeason, optionsSeason }: Props) => {
  const t = useTranslations();

  const [isOpenSelectSeason, setIsOpenSelectSeason] = useState(false);

  const toggleDropdown = () => setIsOpenSelectSeason(!isOpenSelectSeason);

  const handleOptionClick = (option: string) => {
    setSelectedOptionSeason(option);
    setIsOpenSelectSeason(false);
  };

  return (
    <div className="relative w-2/6 text-white">
      <button
        onClick={toggleDropdown}
        className={`${
          isOpenSelectSeason ? "rounded-b-none" : "rounded-b-[8px]"
        } w-full py-1 pl-2 pr-1 text-left  rounded-[8px] border border-solid border-[#AD98FF]  bg-gradient-to-t from-[#AD98FF] to-[#612DFE] focus:outline-none`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[8px] mb-1">{t("Select Season")}</p>
            <p className="text-[10px] font-bold">
              {t("Current")} {selectedOptionSeason}
            </p>
          </div>
          {isOpenSelectSeason ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </div>
      </button>
      {isOpenSelectSeason && (
        <ul className="absolute w-full bg-[#F2F3F8] rounded-b-[8px] h-[105px] overflow-y-scroll">
          {optionsSeason.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="text-center font-bold cursor-pointer text-[10px] border-b border-solid border-[#DFE4EF] p-1"
            >
              <span className={`${option === selectedOptionSeason ? "text-[#7A2FF4]" : "text-[#554D77]"} `}>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectSeason;
