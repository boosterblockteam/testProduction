"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { DataOperationsClaim } from "./components/mockData";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import Navbar from "@/app/components/generals/Navbar";

interface Props {
  dataClaim: DataOperationsClaim[];
}

const Claim = ({ dataClaim }: Props) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDeclined, setIsDeclined] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<string>("10,000");
  const [currentProfit, setCurrentProfit] = useState<string>("8,000");

  const numberByPage = 10;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: dataClaim,
    numberByPage: numberByPage,
  });

  const buttonClaim = () => {
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
    <div className="container-claim pt-[52px]">
      <div className="header-notifications rounded-b-[40px] px-6 py-4 bg-gradient-to-t from-[#0E0E33] to-[#39307B] fixed top-0 z-50 w-full">
        <Navbar text={t("Claims")} />
      </div>

      <div className="container-up my-[32px] mx-6">
        <div className="p-2 rounded-[20px] border-solid border-[1px] border-[#AD98FF] mb-4">
          <div className="text-white bg-[#7A2FF4] py-4 px-2 rounded-[10px] text-center">
            <p className="mb-2 text-[14px]">{t("Wallet Balance")}</p>
            <p className="text-[24px] font-bold">
              $ {walletBalance}
              <span className="text-[14px]">.00</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <div className="text-white bg-[#7A2FF4] text-[14px] text-center p-2 rounded-[10px] flex flex-col flex-grow justify-center items-center basis-[140px] h-[74px]">
              <p>{t("Total Claimed")}</p>
              <p className="font-bold text-[16px] mt-1">$ 2,000</p>
            </div>
            <div className="text-white bg-[#7A2FF4] text-[14px] text-center p-2 rounded-[10px] flex flex-col flex-grow justify-center items-center basis-[140px] h-[74px]">
              <p>{t("Total Gross Profit")}</p>
              <p className="font-bold text-[16px] mt-1">$ 8,000</p>
            </div>
          </div>
        </div>

        <div className="container-text my-4 shadow-md p-6 rounded-[16px] ">
          <span className="text-[#A9AEB4] text-[12px]">{t("You can claim all the profits any time you want")}</span>
        </div>

        <div className="container-claim-amount p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-white shadow-md">
          <h2 className="text-[18px] font-bold mb-4">{t("Claim")}</h2>
          <div className="mb-6 rounded-[10px] border border-solid border-[#F2F3F8] p-2">
            <div className="p-4 rounded-[10px] border border-solid border-[#7A2FF4] text-center ">
              <p className="text-[24px] text-[#554D77] font-bold">$ {currentProfit}</p>
              <p className="text-[14px] text-[#554D77] mt-1">{t("Current Profit")}</p>
            </div>
            <div className="mt-4 mb-2 flex items-center justify-between">
              <span className="text-[14px] text-[#A9AEB4]">{t("Performance Fee")}</span>
              <span className="text-[14px] text-[#A9AEB4] font-bold">$ 0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#A9AEB4]">{t("Profit to Send")}</span>
              <span className="text-[14px] text-[#A9AEB4] font-bold">$ 0.00</span>
            </div>
          </div>

          <div>
            <ButtonPrimary text={t("Claim")} onClickFn={buttonClaim} />
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

      <div className={`px-[24px] pt-[32px] pb-[96px] rounded-t-[40px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]`}>
        <div className="mb-6">
          <h1 className="text-[20px] text-white  font-bold">{t("Claim History")}</h1>
        </div>
        {elemetsVisibleByPage.length > 0 ? (
          <>
            <div className="component-claimHistory bg-[#ffffff1a] rounded-[16px] p-4">
              {elemetsVisibleByPage.map((claim) => (
                <div
                  key={claim.id}
                  className="container-map flex justify-between items-center py-4 border-b border-solid border-[#ffffff1a] last:border-b-0"
                >
                  <div className="container-claim-amount">
                    <p className="text-[#20DABB] text-[16px] font-bold">{claim.amountClaim}</p>
                    <span className="text-[12px] text-[#A9AEB4]">{claim.date} </span>
                    <span className="text-[12px] text-[#A9AEB4]">{claim.time}</span>
                  </div>
                  <div className="container-amount">
                    <p className="text-white text-[14px] font-bold">
                      $ {claim.amountProfit} {t("Profit")}
                    </p>
                    <span className="text-[14px] text-[#A9AEB4] font-bold">
                      +${claim.amountFee} {t("Fee")}
                    </span>
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
          <h1 className="text-white font-bold text-[18px] text-center">{t("No claims history")}</h1>
        )}
      </div>
    </div>
  );
};

export default Claim;
