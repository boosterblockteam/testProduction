"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import IconLogo from "@/assets/imgs/LogoTipoPeq.png";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import Link from "next/link";
import InfoWalletNFT from "@/app/components/generals/InfoWalletNFT";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";
import { useRouter } from "next/navigation";
import { useActiveWallet, useDisconnect } from "thirdweb/react";

const TermsConditions = () => {
  const t = useTranslations();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

      if (isAtBottom) {
        setIsScrolledToBottom(true);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      const container = containerRef.current;
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  function backToWelcome() {
    if (wallet) {
      disconnect(wallet);
    }

    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
    const url = `/welcome?sponsor=${sponsor}&legside=${legSide}`;
    router.push(url);
  }

  function acceptTerms() {
    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
    const url = `/privacyPolicy?sponsor=${sponsor}&legside=${legSide}`;
    router.push(url);
  }

  return (
    <div className="container-knowOurTerms h-full">
      <div className="rounded-b-[40px] px-6 py-4 bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
        <div className="header-logo flex justify-between">
          <div>
            <Image src={IconLogo} alt="logo" width={28} height={24} />
          </div>
          <InfoWalletNFT />
        </div>
        <div className="mt-[16px]">
          <h1 className="text-[24px] font-bold text-white">{t("Terms & Conditions")}</h1>
        </div>
      </div>

      <div className="pt-6 px-6  text-[#1E0E39] text-[16px] montserrat-regular w-full">
        <div
          className=" container-scroll flex flex-col bg-[#F2F3F8] rounded-lg px-4 py-2  overflow-y-scroll h-[calc(100vh-219px)]"
          ref={containerRef}
        >
          <div>
            <div className="montserrat-regular text-[14px] text-[#1E0E39]">
              <div className="font-bold mb-4 border-b border-solid border-[#DBDFE4]">
                <p className="mb-3">{t("Terms and Conditions for")} DeFily.ai </p>
                <p className="pb-4">{t("EFFECTIVE DATE")}: 04/08/2024</p>
              </div>

              <p>{t("welcomeToDefily Terms and Conditions")}</p>
            </div>

            <div className="p-2 rounded-[10px] border border-solid border-[#AD98FF] mt-4">
              <p className="montserrat-regular text-[16px] text-[#1E0E39]">{t("by using Defily Terms and Conditions")}</p>
            </div>
          </div>

          <div className="mt-4 border-t border-solid border-[#DBDFE4] pt-4">
            <div className="pb-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">1</p>
                <span className="font-bold">{t("Acceptance of Terms")}</span>
              </div>
              <p className="mt-4">{t("By using our website and services")}</p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">2</p>
                <span className="font-bold">{t("Eligibility")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Age Requirement")}:</span> {t("You must be at least 18 years old to use our services")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Geographic Restrictions")}:</span>{" "}
                {t("Residents of the United States North Korea and other blacklisted")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">3</p>
                <span className="font-bold">{t("Account Activation and Membership")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Account Activation Fee")}:</span> {t("To activate your DeFily account NFT")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Membership Plans")}:</span> {t("We offer both yearly membership plans")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">4</p>
                <span className="font-bold">{t("Crypto Staking and Risks")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Staking")}:</span> {t("When you stake your cryptocurrency with DeFily")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Responsibility for Losses")}:</span>{" "}
                {t("You are solely responsible for any losses resulting from your staking activities")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">5</p>
                <span className="font-bold">{t("Account Security and Wallets")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Wallet Connection")}:</span>{" "}
                {t("You are required to connect your own crypto wallet to your DeFily account")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Account Responsibility")}:</span>{" "}
                {t("You are solely responsible for maintaining the security of your account and wallet")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">6</p>
                <span className="font-bold">{t("Affiliate Program")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Affiliate Program")}:</span> {t("Participation in our affiliate program is optional")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Cross-Recruiting Restriction")}:</span>{" "}
                {t("Cross-recruiting or the recruitment of individuals who are already affiliated with another member or affiliate within DeFily")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">7</p>
                <span className="font-bold">{t("No Guarantee of Results")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("No Guarantees")}:</span>{" "}
                {t("We do not guarantee any specific financial outcomes or results from using our services")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Performance Fees")}:</span>{" "}
                {t("Profits from trading are subject to performance fees as detailed in your membership plan")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">8</p>
                <span className="font-bold">{t("Service Updates and Changes")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Service Updates")}:</span> {t("DeFily reserves the right to update")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">9</p>
                <span className="font-bold">{t("Disclaimer of Liability")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Financial Losses")}:</span>{" "}
                {t("DeFily is not responsible for any financial losses or damages incurred from trading activities or reliance on our services")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("DeFi Risks")}:</span> {t("Cryptocurrency and DeFi trading involve high risk and market volatility")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">10</p>
                <span className="font-bold">{t("Taxes and Jurisdiction")}</span>
              </div>
              <p className="mt-4">{t("You are solely responsible for any taxes applicable to your staking rewards")}</p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">11</p>
                <span className="font-bold">{t("Disclaimer of Liability")}</span>
              </div>
              <p className="mt-4">
                {t("For any questions or concerns regarding these Terms and Conditions")}{" "}
                <span className="font-bold">{t("Email")} info@defily.ai</span>
              </p>
            </div>
          </div>
        </div>
        <div className="container-btn flex justify-between mt-6">
          <div className="container-btnClose w-2/6">
            <ButtonSecondary text={t("Back")} onClickFn={() => backToWelcome()} classname="buttonBack" />
          </div>

          <div className="container-btnAgree w-4/6 ml-4">
            <ButtonPrimary text={t("I Agree")} onClickFn={() => acceptTerms()} disabled={!isScrolledToBottom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
