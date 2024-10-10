"use client";
import React, { useEffect } from "react";
import ContainerLanguage from "@/app/components/generals/ContainerLanguage";
import Image from "next/image";
import ConnectWalletButton from "@/app/components/web3/components/ConnectWalletButton";
import { useTranslations } from "next-intl";
import Logo from "@/assets/imgs/Logo.png";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/app/components/web3/hooks/register/useRegister";
import { useGetNftAccount } from "@/app/components/web3/hooks/useGetNftAccount";
import { useGetPoi } from "@/app/components/web3/hooks/useGetPoi";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";

const Welcome = () => {
  const t = useTranslations();

  const account = useActiveAccount();

  const { clearRegisterFormsData } = useRegister();

  const router = useRouter();

  const { poi, isLoading: isLoadingPoi } = useGetPoi();
  const { nftAccount, isLoading: isLoadingNftAccount } = useGetNftAccount();

  useEffect(() => {
    clearRegisterFormsData();
    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();

    if (isLoadingPoi || isLoadingNftAccount) {
      return;
    }

    const userAcceptedTermsStorage = localStorage.getItem("userAcceptedTerms");
    const userAcceptedTerms: boolean = userAcceptedTermsStorage ? JSON.parse(userAcceptedTermsStorage) : false;

    console.log({
      account,
      poi,
      nftAccount,
      userAcceptedTerms
    })

    if (account && poi === null && nftAccount === null && !userAcceptedTerms) {
      router.push(`/termAndConditions?sponsor=${sponsor}&legside=${legSide}`);
      return;
    }

    if (account && poi === null && nftAccount === null) {
      router.push(`/register?sponsor=${sponsor}&legside=${legSide}`);
    }

    if (account && poi !== null && nftAccount === null) {
      router.push(`/purchaseNft?sponsor=${sponsor}&legside=${legSide}`);
    }

    if (account && poi !== null && nftAccount !== null) {
      router.push("/dashboard");
    }

  }, [account, poi, nftAccount, isLoadingPoi, isLoadingNftAccount]);

  return (
    <div className="welcome">
      <div className="container-up">
        <div className="container-text">
          <Image src={Logo} alt="logo" width={160} height={40} />
          <h1 className="title text-[36px]">
            {t("Welcome to the")} <span>{t("Web3 World")}</span>!
          </h1>
          <span className="text-span">{t("Your Gateway to Decentralized Finance")}</span>
        </div>
        <div className="absolute top-6 right-6">
          <ContainerLanguage />
        </div>
      </div>
      <div className="container-center">
        <div className="container-btn-primary w-[312px]">
          {!account && (
            <ConnectWalletButton />
          )}
          {/* <ButtonPrimary text={t("Log In")} onClickFn={btnRedirectLogin} />*/}
        </div>
      </div>
      <div className="container-down"></div>
    </div>
  );
};

export default Welcome;
