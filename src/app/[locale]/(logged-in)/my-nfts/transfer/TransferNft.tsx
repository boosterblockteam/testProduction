"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useUserRegisterStore } from "@/store/user-register";
import IconError from "@/assets/icons/ErrorExclamacion.svg";

import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
const TranferNFT = () => {
  const t = useTranslations();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [walletTransfer, setWalletTransfer] = useState<string>("");

  const getUserRegisterStore = useCallback(useUserRegisterStore, []);
  const userStore = getUserRegisterStore();

  useEffect(() => {
    setWalletTransfer(userStore.wallet || "");
  }, [getUserRegisterStore]);

  const buttonChangeWallet = () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);

    setTimeout(() => {
      setIsModalOpen(false);
      router.push("/my-nfts");
    }, 6000);
  };

  return (
    <div className="pb-[88px]  bg-gradient-to-t from-[#0E0E33] to-[#39307B] text-white">
      <HeaderPages text={t("Transfer NFT")} linkRouter="/my-nfts" />

      <div className="px-6 flex flex-col justify-center min-h-[calc(100vh-219px)] ">
        <div className="rounded-[10px] border border-solid border-[#AD98FF] gradientPurpleLight p-4">
          <h1 className="text-[24px] font-bold">{t("Transfer NFT")}</h1>
          <div className=" my-6">
            <label className="text-[14px] font-bold">{t("Wallet to receive the NFT")}</label>
            <input
              type="text"
              placeholder="1Lbcfr7sAHTD9CgdQo3HTMTkV..."
              required
              value={walletTransfer}
              onChange={(e) => setWalletTransfer(e.target.value)}
              className="p-4 rounded-[10px] bg-[#ffffff1a] w-full mt-1 text-[14px] text-[#A9AEB4]"
            />
          </div>

          <div>
            <ButtonPrimary text={t("Proceed to Transfer")} onClickFn={buttonChangeWallet} />

            <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
              {isProcessing ? (
                <div className="w-full h-full flex flex-col items-center justify-center px-16">
                  <div>
                    <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Transferring your Account")}...</p>
                </div>
              ) : isDeclined ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div>
                    <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Failed Transfer")}!</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center px-10">
                  <div>
                    <Image src={CheckDone} alt="Check done" width={60} height={60} />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Successful Transfer")}!</p>
                </div>
              )}
            </ModalComponent>
          </div>
        </div>
      </div>

      <div className="px-4 py-1 rounded-lg border border-solid border-white flex items-center justify-center mx-6">
        <Image src={IconError} alt="Error" />
        <p className="text-[10px] text-white ml-4">{t("Once the NFT has been transferred")}</p>
      </div>
    </div>
  );
};

export default TranferNFT;
