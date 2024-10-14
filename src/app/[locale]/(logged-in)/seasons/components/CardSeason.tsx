"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { DataUserSeasons } from "./mockData";

interface Props {
  dataUserSeasons: DataUserSeasons;
}

const CardSeason = ({ dataUserSeasons }: Props) => {
  const t = useTranslations();

  const currentSeason = {
    title: t("Current Season"),
    data: [
      {
        title: `${t("Left")} MV`,
        value: dataUserSeasons.leftMV,
      },
      {
        title: `${t("Right")} MV`,
        value: dataUserSeasons.rightMV,
      },
      {
        title: `${t("Season")} MV`,
        value: dataUserSeasons.seasonMV,
      },
      {
        title: `${t("Left")} PV`,
        value: dataUserSeasons.leftPV,
      },
      {
        title: `${t("Right")} PV`,
        value: dataUserSeasons.rightPV,
      },
      {
        title: `${t("Season")} PV`,
        value: dataUserSeasons.seasonPV,
      },
    ],
  };

  return (
    <div className={`rounded-[10px] p-1  text-white bg-[#ffffff14]  mb-[10px] last:mb-0 relative`}>
      <div className="text-center font-bold mb-1 text-[12px]">
        {dataUserSeasons.isCurrent ? (
          t("Current Season")
        ) : (
          <div>
            <span className="mr-8">{dataUserSeasons.startDate}</span>
            <span>{dataUserSeasons.endDate}</span>
          </div>
        )}
      </div>
      <div className={`grid grid-cols-3 gap-1`}>
        {currentSeason.data.map(({ title, value }) => (
          <div key={title} className="bg-[#ffffff40] text-[10px] p-1 rounded-[6px] text-center ">
            <div className="mb-[2px]">{title.toLocaleUpperCase()}</div>
            <div className="font-bold text-[1em]">${value}</div>
          </div>
        ))}

        <div className="w-[15px] h-[15px] px-1 py-1 bg-gradient-to-t from-[#AAB1B9] to-[#78808B] text-[12px] font-bold flex justify-center items-center rounded-[100px] absolute top-[1px] left-[1px]  ">
          {dataUserSeasons.id}
        </div>
      </div>
    </div>
  );
};

export default CardSeason;
