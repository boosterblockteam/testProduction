"use client";
import React, { useState } from "react";
import { ProfitHistoryOperations } from "./mockData";
import EyeSeeMore from "@/assets/icons/eye.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ModalComponent from "@/app/components/generals/ModalComponent";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import ArrowModal from "@/assets/imgs/ArrowModalOperations.png";
import ArrowPurpleHash from "@/assets/icons/arrowPurpleHash.svg";
import Countdown from "@/app/components/generals/Countdown";

type Props = {
  dataCard: ProfitHistoryOperations;
};

const CardAllOperations = ({ dataCard }: Props) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#ffffff14] text-white rounded-[16px] p-4 mb-4 last:mb-0">
        <div className="flex justify-between items-center mb-4">
          <div className="rounded-[100px] border border-solid border-[#7A2FF4] pl-1 pr-2 py-1 flex items-center">
            <p className="py-1 px-2 rounded-[20px] bg-[#ffffff14] mr-3 text-[12px] font-bold">
              {t("ID")} {dataCard.id}
            </p>
            <p className="text-[14px]">{dataCard.openDate}</p>
          </div>

          <div
            className="w-[28px] h-[28px] rounded-[4px] bg-gradient-to-t from-[#AD98FF] to-[#612DFE] flex justify-center items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Image src={EyeSeeMore} alt="See More" />
          </div>
        </div>

        <div className="text-[14px]">
          <div className="flex justify-between items-center pb-2 border-b border-solid border-[#ffffff1a] ">
            <p className="text-[#A9AEB4]">{t("Market")}</p>
            <p className="font-bold">{dataCard.market}</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-solid border-[#ffffff1a]">
            <p className="text-[#A9AEB4]">{t("Product")}</p>
            <p className="font-bold">{dataCard.product}</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-solid border-[#ffffff1a]">
            <p className="text-[#A9AEB4]">{t("Side")}</p>
            <p className={`font-bold ${dataCard.side === "Buy" ? "text-[#20DABB]" : "text-[#FF4C5A]"}`}>{dataCard.side}</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-solid border-[#ffffff1a]">
            <p className="text-[#A9AEB4]">{t("Amount")}</p>
            <p className="font-bold">{dataCard.amount}</p>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-solid border-[#ffffff1a]">
            <p className="text-[#A9AEB4]">{t("Pnl").toLocaleUpperCase()}</p>
            <p className="font-bold">{dataCard.pnl}</p>
          </div>
          <div className="flex justify-between items-center pt-2 gap-x-6">
            <div
              className={`flex items-center justify-between px-2 py-1 rounded-[100px]  w-2/4 ${
                dataCard.statusOperation === "Closed" ? "bg-[#1E0E39] text-white" : "bg-[#F2F3F8] text-[#554D77]"
              }`}
            >
              <p className="">{t("Status")}</p>
              <p className="font-bold">{dataCard.statusOperation}</p>
            </div>
            <div className="w-2/4 flex justify-between items-center">
              <p className="text-[#A9AEB4]">{t("Season")}</p>
              <p className="font-bold">{dataCard.season}</p>
            </div>
          </div>
        </div>
      </div>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[312px] h-auto rounded-xl">
        <div className="container-modal p-4">
          <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
          <div className="">
            <div className="rounded-[100px] border border-solid border-[#7A2FF4] pl-1 pr-2 py-1 flex items-center text-[#554D77] w-[132px]">
              <p className="py-1 px-2 rounded-[20px] bg-[#F2F3F8] mr-3 text-[12px] font-bold">
                {t("ID")} {dataCard.id}
              </p>
              <p className="text-[14px]">{dataCard.openDate}</p>
            </div>

            <div className="open p-2 rounded-[10px] bg-[#F8F8FA] mt-4 text-[14px]">
              <h1 className="font-bold text-center text-[#554D77]">{t("Open").toLocaleUpperCase()}</h1>

              <div className="text-[14px] text-[#1E0E39]">
                <div className="flex justify-between items-center py-[10px] ">
                  <p className="text-[#A9AEB4]">{t("Date")}</p>
                  <p>{dataCard.openDate}</p>
                </div>
                <div className="flex justify-between items-center pb-[10px]">
                  <p className="text-[#A9AEB4]">{t("Price")}</p>
                  <p>{dataCard.openPrice}</p>
                </div>

                <div className="flex justify-between items-center pb-[10px] ">
                  <p className="text-[#A9AEB4]">{t("Order Type")}</p>
                  <p>{dataCard.orderType}</p>
                </div>
                <div className="flex justify-between items-center pb-[10px]">
                  <p className="text-[#A9AEB4]">{t("Status")}</p>
                  <p className={` ${dataCard.statusTransaction === "Executed" ? "text-[#1E0E39]" : "text-[#FF4C5A]"}`}>
                    {dataCard.statusTransaction}
                  </p>
                </div>

                <div className={`flex items-center justify-between`}>
                  <p className="text-[#A9AEB4]">{t("Hash")}</p>
                  <p className="text-[#36ADD8] flex items-center ">
                    {dataCard.hash.substring(0, 10) + "..."} <Image src={ArrowPurpleHash} alt="Hash" width={18} height={18} className="ml-1" />
                  </p>
                </div>
              </div>
            </div>

            <div className="container-arrow mt-4 flex items-center">
              <div className="h-[1px] w-[40%] bg-[#EBECEF]"></div>
              <div className="mx-4">
                <Image src={ArrowModal} alt="Arrow" width={28} height={28} />
              </div>
              <div className="h-[1px] w-[40%] bg-[#EBECEF]"></div>
            </div>

            <div className="close p-2 rounded-[10px] bg-[#F8F8FA] mt-4 text-[14px]">
              <h1 className="font-bold text-center text-[#554D77]">{t("Close").toLocaleUpperCase()}</h1>

              <div className="text-[14px] text-[#1E0E39]">
                <div className="flex justify-between items-center py-[10px] ">
                  <p className="text-[#A9AEB4]">{t("Date")}</p>
                  <p>{dataCard.closeDate}</p>
                </div>
                <div className="flex justify-between items-center pb-[10px]">
                  <p className="text-[#A9AEB4]">{t("Price")}</p>
                  <p>{dataCard.closePrice}</p>
                </div>

                <div className="flex justify-between items-center pb-[10px] ">
                  <p className="text-[#A9AEB4]">{t("Order Type")}</p>
                  <p>{dataCard.orderType}</p>
                </div>
                <div className="flex justify-between items-center pb-[10px]">
                  <p className="text-[#A9AEB4]">{t("Status")}</p>
                  <p className={` ${dataCard.statusTransaction === "Executed" ? "text-[#1E0E39]" : "text-[#FF4C5A]"}`}>
                    {dataCard.statusTransaction}
                  </p>
                </div>

                <div className={`flex items-center justify-between`}>
                  <p className="text-[#A9AEB4]">{t("Hash")}</p>
                  <p className="text-[#36ADD8] flex items-center ">
                    {dataCard.hash.substring(0, 10) + "..."} <Image src={ArrowPurpleHash} alt="Hash" width={18} height={18} className="ml-1" />
                  </p>
                </div>
              </div>
            </div>

            <div className="operationTime p-2 rounded-[10px] border border-solid border-[#F2F3F8] mt-4 mx-auto text-[12px] text-[#554D77] w-[143px]">
              <p className="font-bold text-center mb-2">{t("Operation Time")}</p>
              <Countdown
                bgColor="bg-[#F8F8FA]"
                endDate={new Date()}
                nowDate={null}
                classDate="text-[14px]"
                classname="flex justify-center items-center rounded-[6px] bg-[#F8F8FA] px-2"
              />
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default CardAllOperations;
