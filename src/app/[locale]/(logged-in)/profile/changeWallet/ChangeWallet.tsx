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

import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
const ChangeWallet = () => {
  const t = useTranslations();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [newWallet, setNewWallet] = useState<string>("");

  const getUserRegisterStore = useCallback(useUserRegisterStore, []);
  const userStore = getUserRegisterStore();

  useEffect(() => {
    setNewWallet(userStore.wallet || "");
  }, [getUserRegisterStore]);

  const buttonChangeWallet = () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    setTimeout(() => {
    setIsProcessing(false);
     }, 5000);

     setTimeout(() => {
       setIsModalOpen(false);
       router.push("/profile");
    }, 6000);
  };

  return (
    <div className="pb-[88px]  bg-gradient-to-t from-[#0E0E33] to-[#39307B] text-white">
      <HeaderPages text={t("Change Wallet")} />

      <div className="px-6 flex flex-col justify-center min-h-[calc(100vh-219px)]">
        <div className="rounded-[10px] p-4 bg-gradient-to-t from-[#ffffff1a] to-[#39307B]">
          <div className=" ">
            <label className="text-[14px] font-bold">{t("New Wallet")}</label>
            <input
              type="text"
              placeholder="0x46d65ff94562365984efd9384e..."
              required
              value={newWallet}
              onChange={(e) => setNewWallet(e.target.value)}
              className="p-4 rounded-[10px] bg-[#ffffff1a] w-full mt-1 text-[14px] text-[#A9AEB4]"
            />
          </div>
        </div>
      </div>

      <div className="px-6">
        <ButtonPrimary text={t("Change Wallet")} onClickFn={buttonChangeWallet} />

        <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
          {isProcessing ? (
            <div className="w-full h-full flex flex-col items-center justify-center px-16">
              <div>
                <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Saving your New Wallet")}...</p>
            </div>
          ) : isDeclined ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Wallet Unsuccesfully Saved")}!</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center px-10">
              <div>
                <Image src={CheckDone} alt="Check done" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Wallet Succesfully Saved")}!</p>
            </div>
          )}
        </ModalComponent>
      </div>
    </div>
  );
};

export default ChangeWallet;
