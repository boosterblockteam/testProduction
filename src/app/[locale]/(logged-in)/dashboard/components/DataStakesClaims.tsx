"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import ButtonHeaderOpts from "./ButtonHeaderOpts";
import { useBalance } from "@/app/components/web3/hooks/useBalance";
import { formatCurrencyDecimal, formatCurrencyInteger } from "@/utils/formatCurrency";
import ModalComponent from "@/app/components/generals/ModalComponent";
import Image from "next/image";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import { useClaim } from "@/app/components/web3/hooks/useClaim";
import TotalClaimStepsOfModal from "./TotalClaimStepsOfModal";
import { useRewards } from "@/app/components/web3/hooks/useRewards";

const DataStakesClaims = () => {
  const t = useTranslations();
  const { balance } = useBalance();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenProcessing, setIsModalOpenProcessing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const { claimBonusNft, claimDirectBonus } = useClaim();
  const { nftProfit, memberProfit, totalRewards } = useRewards();

  const [isClaimedBonusNft, setIsClaimedBonusNft] = useState(false);
  const [isClaimedDirectBonus, setIsClaimedDirectBonus] = useState(false);

  const buttonClaimTotalRewards = () => {
    setIsModalOpen(true);
  };

  const openModalProcessing = async () => {
    setIsModalOpenProcessing(true);
    setIsProcessing(true);

    setIsClaimedBonusNft(false);
    setIsClaimedDirectBonus(false);

    // Claim Bonus NFT
    const { errors: errorsClaimBonusNft } = await claimBonusNft();
    if (errorsClaimBonusNft) {
      console.log(errorsClaimBonusNft);
      setIsProcessing(false);
      setIsDeclined(true);
      return;
    }
    setIsClaimedBonusNft(true);

    // Claim Direct Bonus
    const { errors: errorsClaimDirectBonus } = await claimDirectBonus();
    if (errorsClaimDirectBonus) {
      console.log(errorsClaimDirectBonus);
      setIsProcessing(false);
      setIsDeclined(true);
      return;
    }
    setIsClaimedDirectBonus(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsModalOpenProcessing(false);
  };

  const buttonClaimModal = async () => {
    console.log("buttonClaimModal");
    setIsModalOpen(false);
    openModalProcessing();
  };

  function closeModal() {
    setIsModalOpenProcessing(false);
  }

  return (
    <div>
      <div className="p-2 rounded-[20px] border-solid border-[1px] border-[#AD98FF] mb-4">
        <div className="text-[#7A2FF4] bg-white py-4 px-2 rounded-[10px] text-center">
          <p className="mb-2 text-[14px]">{t("Wallet Balance")}</p>
          <p className="text-[24px] font-bold">
            $ {formatCurrencyInteger(balance)}
            <span className="text-[14px]">{formatCurrencyDecimal(balance)}</span>
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2 my-2">
            <ButtonHeaderOpts text={t("NFT Bonus")} amount={nftProfit} onClaim={claimBonusNft} />
            <ButtonHeaderOpts text={t("Staking Profit")} amount={"0"} onClaim={async () => ({ errors: { message: "Not implemented" } })} />
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <ButtonHeaderOpts text={t("Direct Bonus")} amount={memberProfit} onClaim={claimDirectBonus} />
            <ButtonHeaderOpts text={t("Direct Rewards")} amount={"0"} onClaim={async () => ({ errors: { message: "Not implemented" } })} />
          </div>
          <div className="flex flex-wrap gap-2">
            <ButtonHeaderOpts text={t("Binary Bonus")} amount={"0"} onClaim={async () => ({ errors: { message: "Not implemented" } })} />
            <ButtonHeaderOpts text={t("Binary Rewards")} amount={"0"} onClaim={async () => ({ errors: { message: "Not implemented" } })} />
          </div>
        </div>
      </div>

      <ButtonPrimary text={t("Claim Total Rewards")} onClickFn={buttonClaimTotalRewards} />

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[312px] h-[318px] rounded-xl">
        <div className="container-modal">
          <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
          <div className="container-claim-amount p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-white shadow-md">
            <h2 className="text-[18px] font-bold">{t("Claim")}</h2>
            <p className="text-[14px] font-bold mb-4">{t("Total Rewards")}</p>
            <div className="mb-6 rounded-[10px] border border-solid border-[#F2F3F8] p-2">
              <div className="p-4 rounded-[10px] border border-solid border-[#7A2FF4] text-center ">
                <p className="text-[24px] text-[#554D77] font-bold">$ {totalRewards}</p>
                <p className="text-[14px] text-[#554D77] mt-1">{t("Available to Claim")}</p>
              </div>
              <div className="mt-4 mb-2 flex items-center justify-between">
                <span className="text-[14px] text-[#A9AEB4]">{t("Performance Fee")}</span>
                <span className="text-[14px] text-[#A9AEB4] font-bold">$ 0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#A9AEB4]">{t("Profit to Claim")}</span>
                <span className="text-[14px] text-[#A9AEB4] font-bold">$ {totalRewards}</span>
              </div>
            </div>

            <div>
              <ButtonPrimary text={`${t("Claim")} ${t("Total Rewards")}`} onClickFn={buttonClaimModal} />
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
            <TotalClaimStepsOfModal isClaimedBonusNft={isClaimedBonusNft} isClaimedDirectBonus={isClaimedDirectBonus} />
            <p className="mt-8 text-[14px] text-[#FF4C5A] text-center font-bold">{t("Do not refresh or close this page")!}</p>
          </div>
        ) : isDeclined ? (
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <div>
              <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
            </div>
            <TotalClaimStepsOfModal isClaimedBonusNft={isClaimedBonusNft} isClaimedDirectBonus={isClaimedDirectBonus} />
            <p className="mt-8 text-[14px] text-[#FF4C5A] text-center font-bold">{t("AN ERROR OCCURRED WHILE PROCESSING BINARY REWARDS CLAIM")}</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <div>
              <Image src={CheckDone} alt="Check done" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Successful Total Rewards Claim")}</p>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default DataStakesClaims;
