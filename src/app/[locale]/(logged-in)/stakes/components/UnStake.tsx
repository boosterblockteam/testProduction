"use client";
import React, { useState } from "react";
import { DataOperationsUnStake } from "./MockData";
import { useTranslations } from "next-intl";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";

interface Props {
  dataUnStake: DataOperationsUnStake[];
}

const UnStake = ({ dataUnStake }: Props) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const numberByPage = 10;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: dataUnStake,
    numberByPage: numberByPage,
  });

  const buttonUnStake = () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 6000);
  };

  return (
    <div className="container-UnStake p-6 flex flex-col justify-between h-[calc(100vh-190px)]">
      <div>
        <div className="container-available rounded-[16px] shadow-md bg-[#A9AEB4] p-6 text-white text-center">
          <p className="text-[14px] mb-2">{t("Available to Un-Stake")}</p>
          <p className="text-[24px] font-bold ">$0</p>
        </div>
        <div className="container-text my-4 shadow-md p-6 rounded-[16px] ">
          <span className="text-[#A9AEB4] text-[12px]">{t("Here you can make new un-stakes")}</span>
        </div>
      </div>
      <div className="container-unStake-amount p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-white shadow-md">
        <h2 className="text-[18px] font-bold mb-4">{t("Un-Stake")}</h2>
        <div className="mb-6 rounded-[10px] border border-solid border-[#F2F3F8] p-2">
          <p className="text-[14px] font-bold mb-4">{t("Amount")}</p>
          <div className="container-input relative">
            <input type="number" className="rounded-[10px] p-4 bg-[#F2F3F8] w-full" value={0.0} onChange={(e) => console.log(e.target.value)} />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#7A2FF4]">{t("MAX")}</button>
          </div>
        </div>
        <div>
          <ButtonPrimary text={t("Approve Contract")} onClickFn={buttonUnStake} />
          <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
            {isProcessing ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-16">
                <div>
                  <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                </div>
                <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Processing your Request")}</p>
              </div>
            ) : isDeclined ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div>
                  <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
                </div>
                <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Failed Transfer")}</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div>
                  <Image src={CheckDone} alt="Check done" width={60} height={60} />
                </div>
                <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Done")}</p>
              </div>
            )}
          </ModalComponent>
        </div>
      </div>
    </div>
  );
};

export default UnStake;
