"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/generals/Navbar";
import { useTranslations } from "next-intl";
import CardImagen from "@/assets/imgs/marketingImg.png";
import Image from "next/image";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import ModalComponent from "@/app/components/generals/ModalComponent";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";

const Marketing = () => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen pb-[80px]">
      <div className=" px-6  pb-4 container-up-img h-[160px]">
        <Navbar text={t("Marketing")} />
      </div>

      <div className="container-Card rounded-[10px] border border-solid border-[#AD98FF] mx-6">
        <div>
          <Image src={CardImagen} alt="CardImagen" className="object-cover rounded-t-[10px] w-full" />
        </div>
        <div className="p-4 gradientPurpleLight rounded-b-[10px] text-white">
          <p className="py-1 px-2 rounded-[6px] border border-solid border-[#ffffff14] text-[14px] font-bold w-[160px]">{t("DOWNLOAD NOW")}!</p>
          <h1 className="my-4 text-[24px] font-bold leading-8">{t("DeFily Opportunity Presentation")}</h1>
          <p className="text-[14px]">{t("We offer you this useful tool so that you can explain in detail")}</p>

          <div className="mt-8">
            <ButtonPrimary text={t("Download")} onClickFn={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-auto rounded-xl">
        <div className="container-modal">
          <div className="cursor-pointer w-6 absolute top-1 right-1" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>

          <div className="p-6 flex flex-col justify-between h-full">
            <p className="text-[16px] text-[#1E0E39] font-bold mb-6">{t("Available Languages for Download")}:</p>
            <div>
              <a href="/[ENGLISH]-DeFily-Opportunity-Presentation-V1.0.pdf" target="_blank" download={"DeFily-Opportunity-Presentation-V1.0.pdf"}>
                <ButtonPrimary text={t("English")} classname="mb-4" />
              </a>
              <a href="/[SPANISH]-DeFily-Opportunity-Presentation-V1.0.pdf" target="_blank" download={"DeFily-Opportunity-Presentation-V1.0.pdf"}>
                <ButtonPrimary text={t("Spanish")} classname="mb-4" />
              </a>
              <a href="/[RUSSIAN]-DeFily-Opportunity-Presentation-V1.0.pdf" target="_blank" download={"DeFily-Opportunity-Presentation-V1.0.pdf"}>
                <ButtonPrimary text={t("Russian")} classname="mb-4" />
              </a>
              <a href="/[ARABIC]-DeFily-Opportunity-Presentation-V1.0.pdf" target="_blank" download={"DeFily-Opportunity-Presentation-V1.0.pdf"}>
                <ButtonPrimary text={t("Arabic")} classname="mb-4" />
              </a>
              <a href="/[VIETNAMESE]-DeFily-Opportunity-Presentation-V1.0.pdf" target="_blank" download={"DeFily-Opportunity-Presentation-V1.0.pdf"}>
                <ButtonPrimary text={t("Vietnamese")} />
              </a>
            </div>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Marketing;
