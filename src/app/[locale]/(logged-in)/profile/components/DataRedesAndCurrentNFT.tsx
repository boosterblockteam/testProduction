"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import { useTranslations } from "next-intl";
import { useUserRegisterStore } from "@/store/user-register";
import DolarColor from "@/assets/imgs/100_color.png";
import DolarGray from "@/assets/imgs/100_gray.png";
import WatchColor from "@/assets/imgs/watch_color.png";
import WatchGray from "@/assets/imgs/watch_gray.png";
import PhoneColor from "@/assets/imgs/iphone_color.png";
import PhoneGray from "@/assets/imgs/iphone_gray.png";
import MackbookColor from "@/assets/imgs/macbook_color.png";
import MackbookGray from "@/assets/imgs/macbook_gray.png";
import RetreatColor from "@/assets/imgs/retreat_color.png";
import RetreatGray from "@/assets/imgs/retreat_gray.png";
import RolexColor from "@/assets/imgs/rolex_color.png";
import RolexGray from "@/assets/imgs/rolex_gray.png";
import CarColor from "@/assets/imgs/car_color.png";
import CarGray from "@/assets/imgs/car_gray.png";
import CybertruckColor from "@/assets/imgs/cybertruck_color.png";
import CybertruckGray from "@/assets/imgs/cybertruck_gray.png";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { ServiceProvider } from "@/app/components/providers/service.provider";
import { useUser } from "@/app/components/web3/context/UserProvider";

type Images = {
  src: string;
};

interface ListLeagueObj {
  typeLeague: string;
  name: string;
  subName: string;
  imgeColor: Images | File | React.ReactNode;
  imgeGray: Images | File | React.ReactNode;
  colorText: string;
  acquiredLevel: boolean;
}

const DataRedesAndCurrentNFT = () => {
  const t = useTranslations();

  const listLeaguesType: ListLeagueObj[] = [
    {
      typeLeague: "Jade",
      name: t("Jade"),
      subName: "$100",
      imgeColor: DolarColor,
      imgeGray: DolarGray,
      colorText: "#9b9b9b",
      acquiredLevel: false,
    },
    {
      typeLeague: "Sapphire",
      name: t("Sapphire"),
      subName: t("APPLE WATCH"),
      imgeColor: WatchColor,
      imgeGray: WatchGray,
      colorText: "#7573A6",
      acquiredLevel: false,
    },
    {
      typeLeague: "Ruby",
      name: t("Ruby"),
      subName: t("IPHONE PRO MAX"),
      imgeColor: PhoneColor,
      imgeGray: PhoneGray,
      colorText: "#9B111E",
      acquiredLevel: false,
    },
    {
      typeLeague: "Emerald",
      name: t("Emerald"),
      subName: t("MACBOOK PRO"),
      imgeColor: MackbookColor,
      imgeGray: MackbookGray,
      colorText: "#00FFBF",
      acquiredLevel: false,
    },
    {
      typeLeague: "Diamond",
      name: t("Diamond"),
      subName: t("RETREAT"),
      imgeColor: RetreatColor,
      imgeGray: RetreatGray,
      colorText: "#C8E5EB",
      acquiredLevel: false,
    },
    {
      typeLeague: "Blue Diamond",
      name: `${t("Blue Diam")}.`,
      subName: t("ROLEX"),
      imgeColor: RolexColor,
      imgeGray: RolexGray,
      colorText: "#70D1F4",
      acquiredLevel: false,
    },
    {
      typeLeague: "Black Diamond",
      name: `${t("Black Diam")}.`,
      subName: t("LUXURY CAR"),
      imgeColor: CarColor,
      imgeGray: CarGray,
      colorText: "#000000",
      acquiredLevel: false,
    },
    {
      typeLeague: "Crown Diamond",
      name: `${t("Crown Diam")}.`,
      subName: t("CYBERTRUCK"),
      imgeColor: CybertruckColor,
      imgeGray: CybertruckGray,
      colorText: "#FFD700",
      acquiredLevel: false,
    },
  ];

  const { user, reloadUser } = useUser();
  const [idAccount, setIdAccount] = useState<number>(0);
  const [isModalOpenCopy, setIsModalOpenCopy] = useState(false);
  const [selectedTypeOrientation, setSelectedTypeOrientation] = useState("");
  const [clikedLegSide, setClikedLegSide] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [proceedChangeLegside, setProceedChangeLegside] = useState(false);
  const [isModalOpenLegside, setIsModalOpenLegside] = useState(false);
  const [legsideCurrent, setLegsideCurrent] = useState(t("Alternate"));

  useEffect(() => {
    if (user.selectedAccount) {
      setIdAccount(user.selectedAccount.idAccount);
      setSelectedTypeOrientation(
        user.selectedAccount.legSide === "l" ? t("Left") : user.selectedAccount.legSide === "r" ? t("Right") : t("Alternate")
      );
      setClikedLegSide(user.selectedAccount.legSide);
    }
  }, [user]);

  const copyReferralLink = () => {
    //Copia el codigo de referido
    const baseURL = process.env.APP_URL;
    const referralLink = `${baseURL}/?sponsor=${idAccount || 0}&legside=${user.selectedAccount?.legSide || "a"}`;
    navigator.clipboard.writeText(referralLink);
    setIsModalOpenCopy(true);
    setTimeout(() => {
      setIsModalOpenCopy(false);
    }, 2000);
  };

  const handleSelectTypeOrientation = async (type: string) => {
    setIsModalOpenLegside(true);

    const legSide = type === t("Left") ? "l" : type === t("Right") ? "r" : "a";

    setClikedLegSide(legSide);
  };

  const buttonProceedLegside = async () => {
    setIsModalOpenLegside(false);
    // setProceedChangeLegside(true);

    const { accountService } = ServiceProvider.getInstance().getServices();

    await accountService.changeLegSide(user.address, clikedLegSide);
    setSelectedTypeOrientation(clikedLegSide === "l" ? t("Left") : clikedLegSide === "r" ? t("Right") : t("Alternate"));
    reloadUser();

    // if (proceedChangeLegside) {
    //   setIsModalOpenLegside(false);

    //   setIsModalOpen(true);
    //   setIsProcessing(true);

    //   setTimeout(() => {
    //     setIsProcessing(false);
    //   }, 5000);

    //   setTimeout(() => {
    //     setIsModalOpen(false);
    //   }, 7000);
    // }
  };

  useEffect(() => {
    if (selectedTypeOrientation) {
      setLegsideCurrent(selectedTypeOrientation);
    }
  }, [selectedTypeOrientation]);

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="pt-2 w-full">
        <p className="text-[16px] font-bold text-[#1E0E39] text-center mb-4">
          {t("Current NFT")}: <span className="font-normal">DeFilyMaster</span>
        </p>
        <div className="container-option w-full flex justify-center gap-x-2 my-4 ">
          <span
            className={`${
              legsideCurrent === t("Left") || (selectedTypeOrientation === t("Left") && proceedChangeLegside)
                ? "text-[#7A2FF4] border-[#7A2FF4]"
                : "text-[#A9AEB4] border-[#DFE4EF]"
            } w-[97px] text-[14px] text-center font-bold px-2 py-[10px] rounded-[10px] bg-white border border-solid `}
            onClick={() => handleSelectTypeOrientation(t("Left"))}
          >
            {t("Left")}
          </span>

          <span
            className={`${
              legsideCurrent === t("Alternate") || (selectedTypeOrientation === t("Alternate") && proceedChangeLegside)
                ? "text-[#7A2FF4] border-[#7A2FF4]"
                : "text-[#A9AEB4] border-[#DFE4EF]"
            } w-[97px] text-[14px] text-center font-bold px-2 py-[10px] rounded-[10px] bg-white border border-solid`}
            onClick={() => handleSelectTypeOrientation(t("Alternate"))}
          >
            {t("Alternate")}
          </span>

          <span
            className={`${
              legsideCurrent === t("Right") || (selectedTypeOrientation === t("Right") && proceedChangeLegside)
                ? "text-[#7A2FF4] border-[#7A2FF4]"
                : "text-[#A9AEB4] border-[#DFE4EF]"
            } w-[97px] text-[14px] text-center font-bold px-2 py-[10px] rounded-[10px] bg-white border border-solid`}
            onClick={() => handleSelectTypeOrientation(t("Right"))}
          >
            {t("Right")}
          </span>
        </div>
      </div>
      <div className="container-btn-copy w-full text-center">
        <button
          onClick={copyReferralLink}
          className="py-[10px] px-4 bgGradientPurpleMedium hover:bg-[#7a2ff4] text-white font-bold rounded-[10px] w-[89%]"
        >
          {t("Copy your Referral Link")}
        </button>
      </div>
      <div className="rounded-[10px] border-[#7A2FF4] h-[182px] mt-8 w-full">
        <div className="rounded-t-[10px] bg-[#7A2FF4] py-[10px]">
          <p className="text-[14px] font-bold text-center text-white">{t("TRACK YOUR ACHIEVEMENTS")}!</p>
        </div>

        <div className="grid grid-cols-4 gap-y-3 justify-items-center h-full rounded-b-[10px] border border-solid border-[#7A2FF4] p-2">
          {listLeaguesType.map((league, index) => (
            <div key={index} className={`flex flex-col items-center justify-center `}>
              <p className={`text-[8px] font-bold  text-center mb-1 ${league.acquiredLevel ? "text-[#554D77]" : "text-[#A9AEB4]"}`}>
                {league.name.toUpperCase()}
              </p>
              <p className={`text-[6px] font-bold  text-center mb-1 ${league.acquiredLevel ? "text-[#7A2FF4]" : "text-[#A9AEB4]"}`}>
                {league.subName.toUpperCase()}
              </p>
              <div
                className={`flex items-center justify-center rounded-full border border-solid w-[48px] h-[48px] ${
                  league.acquiredLevel ? "border-[#7A2FF4]" : " border-[#A9AEB4]"
                }`}
              >
                {league.acquiredLevel ? (
                  <Image src={league.imgeColor as string} alt="LeagueImg" width={48} height={48} />
                ) : (
                  <Image src={league.imgeGray as string} alt="LeagueImg" width={48} height={48} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalComponent isOpen={isModalOpenCopy} setIsOpen={setIsModalOpenCopy} classBody="bg-white w-[285px] rounded-xl">
        <div className="container-modal">
          <div className="p-6">
            <p className="text-[16px] text-[#554D77] text-center">{t("You successfully copied the referral link")} </p>
          </div>
        </div>
      </ModalComponent>

      <ModalComponent isOpen={isModalOpenLegside} setIsOpen={setIsModalOpenLegside} classBody="bg-white w-[285px] rounded-xl">
        <div className="container-modal">
          <div className="p-6">
            <p className="text-[16px] text-[#554D77] text-center">
              {t("Please confirm that you are requesting to change your Legside to")}{" "}
              {clikedLegSide === "l" ? t("Left") : clikedLegSide === "r" ? t("Right") : t("Alternate")}
            </p>
            <div className="container-btn flex justify-between mt-6">
              <div className="container-btnClose w-2/6" onClick={() => setIsModalOpenLegside(false)}>
                <ButtonSecondary text={t("Back")} classname="buttonBack" />
              </div>

              <div className="container-btnAgree w-4/6 ml-4">
                <ButtonPrimary text={t("Proceed")} onClickFn={buttonProceedLegside} />
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
        {isProcessing ? (
          <div className="w-full h-full flex flex-col items-center justify-center px-16">
            <div>
              <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Saving your New Legside")}...</p>
          </div>
        ) : isDeclined ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div>
              <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Legside Unsuccesfully Saved")}!</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div>
              <Image src={CheckDone} alt="Check done" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Legside Succesfully Saved")}!</p>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default DataRedesAndCurrentNFT;
