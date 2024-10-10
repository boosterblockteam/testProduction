"use client";
import React, { useState } from "react";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import Image from "next/image";
import { ClaimError } from "@/app/components/web3/hooks/useClaim";

interface Props {
  text: string;
  amount: number | string;
  onClaim: () => Promise<{
    errors: ClaimError | null;
  }>;
}

const ButtonHeaderOpts = ({ text, amount, onClaim }: Props) => {
  const t = useTranslations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenProcessing, setIsModalOpenProcessing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const openModalProcessing = async () => {
    setIsModalOpenProcessing(true);
    setIsProcessing(true);

    const { errors } = await onClaim();

    if (errors) {
      console.log(errors);
      setIsProcessing(false);
      setIsDeclined(true);
      return;
    }

    setIsProcessing(false);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsModalOpenProcessing(false);
  };

  const buttonClaimModal = () => {
    console.log("buttonClaimModal");
    setIsModalOpen(false);
    openModalProcessing();
  };

  function closeModal() {
    setIsModalOpen(false);
    setIsModalOpenProcessing(false);
    setIsProcessing(false);
    setIsDeclined(false);
  }

  return (
    <>
      <button
        className="bgGradientPurpleMedium text-white hover:bg-gradient-to-t from-[#7a2ff4] to-[#7a2ff4] rounded-[10px] px-2 py-[6px] flex flex-col flex-grow justify-center items-center basis-[140px] h-[48px]"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="mb-2 text-[12px]">{text}</p>
        <p className="text-[14px] font-bold">$ {amount}</p>
      </button>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[312px] h-[318px] rounded-xl">
        <div className="container-modal">
          <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
          <div className="container-claim-amount p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-white shadow-md">
            <h2 className="text-[18px] font-bold">{t("Claim")}</h2>
            <p className="text-[14px] font-bold mb-4">{text}</p>
            <div className="mb-6 rounded-[10px] border border-solid border-[#F2F3F8] p-2">
              <div className="p-4 rounded-[10px] border border-solid border-[#7A2FF4] text-center ">
                <p className="text-[24px] text-[#554D77] font-bold">$ {amount}</p>
                <p className="text-[14px] text-[#554D77] mt-1">{t("Available to Claim")}</p>
              </div>
              <div className="mt-4 mb-2 flex items-center justify-between">
                <span className="text-[14px] text-[#A9AEB4]">{t("Performance Fee")}</span>
                <span className="text-[14px] text-[#A9AEB4] font-bold">$ 0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#A9AEB4]">{t("Profit to Claim")}</span>
                <span className="text-[14px] text-[#A9AEB4] font-bold">$ {amount}</span>
              </div>
            </div>

            <div>
              <ButtonPrimary text={`${t("Claim")} ${text}`} onClickFn={buttonClaimModal} />
            </div>
          </div>
        </div>
      </ModalComponent>

      <ModalComponent
        isOpen={isModalOpenProcessing}
        setIsOpen={setIsModalOpenProcessing}
        classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg"
      >
        {isDeclined && (
          <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => closeModal()}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
        )}
        {isProcessing ? (
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <div>
              <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Processing your Claim", { name: text })}</p>
          </div>
        ) : isDeclined ? (
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <div>
              <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Failed to Claim", { name: text })}</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <div>
              <Image src={CheckDone} alt="Check done" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Successful Claim", { name: text })}</p>
          </div>
        )}
      </ModalComponent>
    </>
  );
};

export default ButtonHeaderOpts;
