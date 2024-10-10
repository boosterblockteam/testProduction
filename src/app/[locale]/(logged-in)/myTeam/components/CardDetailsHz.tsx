"use client";
import TrianguloSVG from "@/assets/icons/TrianguloColor";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import UserImg from "@/assets/imgs/userGL.png";
import EyeSeeMore from "@/assets/icons/eye.svg";
import { usePathname, useRouter } from "next/navigation";
import ModalComponent from "@/app/components/generals/ModalComponent";

const CardDetailsHz = ({ infoUsers }) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpenCopyWallet, setIsModalOpenCopyWallet] = useState<boolean>(false);

  const copyWallet = (wallet: string) => {
    navigator.clipboard.writeText(wallet);
    setIsModalOpenCopyWallet(true);

    setTimeout(() => {
      setIsModalOpenCopyWallet(false);
    }, 2000);
  };

  return (
    <>
      <div
        className={`${
          pathname === "/myTeam" ? "mb-4" : "mb-6"
        } rounded-[10px] flex  h-[80px] border border-solid border-[#ffffff1a] bg-gradient-to-t from-[#ffffff1a] to-[#ffffff00]`}
      >
        <div className={`rounded-s-[10px] w-[30px] relative bg-[#7573A6]`}>
          <div className="w-[40px] h-[40px] absolute top-1/2 -right-1/2 transform -translate-y-1/2">
            <Image src={UserImg} alt="StartsImg" className="img-NFT w-full h-full" />
          </div>
          <div className="rounded-tl-[10px] overflow-hidden">
            <TrianguloSVG fill={infoUsers.legSide === "LEFT" ? "#34BFA8" : "#03B051"} />
          </div>
        </div>
        <div className="w-3/6 p-2 ps-8 flex flex-col justify-center items-start border-e border-solid border-[#A9AEB4]">
          <div className="p-1 rounded bg-[#ffffff1a] flex items-center">
            <span className="rounded border border-solid border-[#ffffff1a] text-[8px] text-[#A9AEB4] font-bold py-[2px] px-[6px]">
              {infoUsers.id}
            </span>
            <h1 className="text-white text-[9px] font-bold ml-1">{infoUsers.nameNft}</h1>
          </div>

          <p className="mt-1 text-[9px] text-[#A9AEB4]" onClick={() => copyWallet(infoUsers.wallet)}>{`${infoUsers.wallet.substring(
            0,
            4
          )}...${infoUsers.wallet.substring(infoUsers.wallet.length - 4)}`}</p>

          <p className="mt-1 text-[8px] text-white">{infoUsers.planCurrent}</p>
        </div>

        <div className="py-2 px-4 w-3/6 rounded-e-[10px] flex items-center justify-between">
          <div className="">
            <div className="text-[9px] text-white mb-2">
              <p className="mb-[2px]">{t("Total Staking")}:</p>
              <p className="font-bold">${infoUsers.totalStaking}</p>
            </div>

            <div className="text-[9px] text-[#A9AEB4]">
              <p className="mb-[2px]">{t("Joined in")}:</p>
              <p className="font-bold mb-[2px]">
                {t("Season")} {infoUsers.joinedIn}
              </p>
              <p className="">{infoUsers.joinDate}</p>
            </div>
          </div>

          <div
            className="w-[32px] h-[32px] rounded-[100px] bg-gradient-to-t from-[#AD98FF] to-[#612DFE] flex justify-center items-center cursor-pointer"
            onClick={() => router.push("/myTeam/nft-details")}
          >
            <Image src={EyeSeeMore} alt="See More" />
          </div>
        </div>
      </div>
      <ModalComponent isOpen={isModalOpenCopyWallet} setIsOpen={setIsModalOpenCopyWallet} classBody="bg-white w-[285px] rounded-xl">
        <div className="container-modal">
          <div className="p-6">
            <p className="text-[16px] text-[#554D77] text-center">{t("You successfully copied the wallet")} </p>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default CardDetailsHz;
