"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import AccountPaymentNFT from "./components/AccountPaymentNFT";
import RegistrationPayNFT from "./components/RegistrationPayNFT";

// Importando todas las imágenes de NFT
import InfoWalletNFT from "@/app/components/generals/InfoWalletNFT";
import Navbar from "@/app/components/generals/Navbar";
import { NftToBuy } from "./types/nft-to-buy";
import { ServiceProvider } from "@/app/components/providers/service.provider";

const PurchaseNFT = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const [stepNft, setStepNft] = useState<number>(1);
  const [selectedNFT, setSelectedNFT] = useState<NftToBuy | null>(null);
  const [listNftBuy, setListNftBuy] = useState<NftToBuy[]>([]);

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    const { accountService } = ServiceProvider.getInstance().getServices();
    const { nftsToBuy } = await accountService.getNFTsToBuy();
    console.log({ nftsToBuy });
    setListNftBuy(nftsToBuy);
  };

  return (
    <div className={`px-6 pb-6 pt-4 bg-gradient-to-t from-[#0E0E33] to-[#39307B] text-white ${pathname === "/purchaseNft" ? "mb-0" : "mb-16"}`}>
      {pathname === "/purchaseNft" ? (
        <div className="container-header mb-8 w-full">
          <div className="container-logo flex justify-between">
            <div className="flex items-center">
              <div>
                <Image src={LogoPeq} alt="logo" width={28} height={24} />
              </div>
              <div className="ml-2">
                <div className="text-[12px] text-white">
                  <p>
                    {t("STEP")} 2 {t("OF")} 5
                  </p>
                  <p className="text-[14px] text-[#20DABB] font-bold mt-1">NFT</p>
                </div>
              </div>
            </div>
            <InfoWalletNFT />
          </div>
        </div>
      ) : (
        <div className="container-header mb-8 w-full">
          <Navbar
            text={pathname === "/myTeam/new-own-account" ? t("New Own Account") : pathname === "/my-nfts/buy-nft" ? t("Buy NFT") : t("New Partner")}
          />
        </div>
      )}

      {stepNft === 1 || selectedNFT === null ? (
        <AccountPaymentNFT setStepNft={setStepNft} selectedNFT={selectedNFT} setSelectedNFT={setSelectedNFT} listNftBuy={listNftBuy} />
      ) : (
        <RegistrationPayNFT setStepNft={setStepNft} selectedNFT={selectedNFT} />
      )}
    </div>
  );
};

export default PurchaseNFT;
