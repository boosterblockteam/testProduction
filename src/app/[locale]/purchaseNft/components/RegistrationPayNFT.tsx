"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import Image from "next/image";
import { useUserRegisterStore } from "@/store/user-register";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";
import { NftToBuy } from "../types/nft-to-buy";

type Props = {
  setStepNft: (value: number) => void;
  selectedNFT: NftToBuy;
};

const RegistrationPayNFT = ({ setStepNft, selectedNFT }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const buttonConfirm = () => {
    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
    const queryString = `sponsor=${sponsor}&legside=${legSide}`;

    if (pathname === "/purchaseNft") {
      router.push(`/membership?${queryString}`);
    } else if (pathname === "/myTeam/new-own-account") {
      router.push(`/myTeam/new-own-account/select-membership?${queryString}`);
    } else if (pathname === "/myTeam/new-partner") {
      router.push(`/myTeam/new-partner/select-membership?${queryString}`);
    } else {
      router.push(`/my-nfts/buy-nft/select-membership?${queryString}`);
    }
  };

  return (
    <div
      className={`mt-6 pt-8 flex flex-col justify-between ${pathname === "/purchaseNft" ? "min-h-[calc(100vh-111px)]" : "min-h-[calc(100vh-156px)]"}`}
    >
      <div className="p-4 rounded-[10px] mx-auto bg-gradient-to-b from-[#ffffff1a] to-[#ffffff00]">
        <h1 className="text-[24px] font-bold">{t("NFT Confirmation")}</h1>
        <div className="w-full my-8">
          <Image src={selectedNFT.link} alt="NFT" width={350} height={350} className="object-cover" />
        </div>

        <div className="container-wallets mt-8">
          <div className="flex justify-center items-center shadow-sm shadow-[#00000014] rounded-[16px] border-solid border-[1px] border-[#AD98FF] text-[14px] w-[162px] mx-auto p-[24px] bg-[#ffffff1a]">
            <div className="flex justify-center items-center space-x-2">
              <div className="text-[14px]">{t("Total")}</div>
              <div className="text-[24px] font-bold">$30</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center">
          <div className="w-1/3">
            <ButtonSecondary text={t("Back")} onClickFn={() => setStepNft(1)} classname="buttonBack" />
          </div>

          <div className="w-2/3 ml-4">
            <ButtonPrimary text={t("Next")} onClickFn={buttonConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPayNFT;
