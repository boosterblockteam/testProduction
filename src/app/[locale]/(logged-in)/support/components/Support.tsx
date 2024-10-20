"use client";
import React, { useEffect, useRef, useState } from "react";
import ArmsPurple from "@/assets/imgs/supportImgPrincipal.png";
import Arrow from "@/assets/imgs/arrowSupport.png";
import ChatImg from "@/assets/imgs/chatSupport.png";
import { useTranslations } from "next-intl";
import Navbar from "@/app/components/generals/Navbar";
import Image from "next/image";
import Link from "next/link";
import ModalComponent from "@/app/components/generals/ModalComponent";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import TawkToWidget from "./TawkToWidget";

const Support = () => {
  const t = useTranslations();
  const router = useRouter();

  // Tawk Messenger
  // const propertyId = "66ff07be37379df10df16bb3";
  // const widgetId = "1i9a3cg4a";
  // const tawkMessengerRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).Tawk_API !== "undefined") {
      var Tawk_API = (window as any).Tawk_API || {};

      Tawk_API.customStyle = {
        visibility: {
          desktop: {
            position: "br",
            xOffset: "60px",
            yOffset: 20,
          },
          mobile: {
            position: "br",
            xOffset: "20px",
            yOffset: "74px",
          },
          bubble: {
            rotate: "0deg",
            xOffset: -20,
            yOffset: 0,
          },
        },
      };
    }
  }, []);

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen pb-[86px] relative">
      <div className="px-6 pb-4 container-up-img h-[155px]">
        <Navbar text={t("Support")} />
      </div>

      <div className="relative -top-[166px] h-[150px]">
        <Image src={ArmsPurple} alt="arms" className="absolute top-[120px] sm:top-[110px] w-full" />
      </div>

      <div className="text-white text-center text-[14px] px-6">
        <h1 className="text-[24px] font-bold">{t("Need some help")}?</h1>

        <div className="my-4 p-2 rounded-[10px] border border-solid border-[#AD98FF]">
          <p className="mb-1">
            <span className="font-bold">{t("Hello")}! </span>
            {t("If you have any questions about our system, you can visit")}
          </p>
          <Link href="https://app.defily.ai/" className="text-[#AD98FF] text-[16px] font-bold cursor-pointer" target="_blank">
            defily.ai
          </Link>
          <p className="mt-1">{t("where you'll find a wide variety of information and resources about our DApp")}.</p>
        </div>

        <div className="p-2 rounded-[10px] border border-solid border-[#AD98FF]">
          <p>{t("Alternatively for any support inquiries")}</p>
        </div>

        {/* <div className="h-[60px] relative">
          <div className="flex items-center justify-end absolute -top-[12px] right-0"> */}
        {/* <Image src={Arrow} alt="arrow" className="w-[77px] h-[77px] " /> */}
        <div className="relative top-0 w-[65px] h-[65px]">
          {/* <TawkMessengerReact propertyId={propertyId} widgetId={widgetId} ref={tawkMessengerRef} className="componentChatTawk" /> */}
          <TawkToWidget />
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[220px] rounded-xl">
        <div className="container-modal">
          <div className="cursor-pointer w-6 absolute top-1 right-1" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>

          <div className="p-6 flex flex-col justify-between h-full">
            <p className="text-[16px] text-[#1E0E39] font-bold mb-6">{t("Available Languages for Download")}:</p>
            <div>
              <ButtonPrimary text={t("English")} onClickFn={() => {}} classname="mb-[44px]" />
              <ButtonPrimary text={t("Spanish")} onClickFn={() => {}} />
            </div>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Support;
