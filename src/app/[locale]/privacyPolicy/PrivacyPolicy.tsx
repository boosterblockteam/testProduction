"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import IconLogo from "@/assets/imgs/LogoTipoPeq.png";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import Link from "next/link";
import { useTranslations } from "next-intl";
import InfoWalletNFT from "@/app/components/generals/InfoWalletNFT";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";
import { useRouter } from "next/navigation";

const PrivacyPolicy = () => {
  const t = useTranslations();
  const [refferalCode, setRefferalCode] = useState<string | null>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUrl = window.location.href;
    const queryStringIndex = currentUrl.indexOf("?");
    if (queryStringIndex !== -1) {
      const queryString = currentUrl.slice(queryStringIndex + 1);
      const params = new URLSearchParams(queryString);
      const referral = params.get("sponsor");
      console.log(referral);
      if (referral) {
        setRefferalCode(referral);
      } else {
        setRefferalCode(referral);
      }
    } else {
      setRefferalCode("0x0000000000000000000000000000000000000123");
    }
  }, []);

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

  function backToTermsAndConditions() {
    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
    const url = `/termAndConditions?sponsor=${sponsor}&legside=${legSide}`;
    router.push(url);
  }

  function acceptTerms() {
    localStorage.setItem("userAcceptedTerms", "true");
    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
    const url = `/register?sponsor=${sponsor}&legside=${legSide}`;
    router.push(url);
  }

  return (
    <div className="container-knowOurTerms">
      <div className="rounded-b-[40px] px-6 py-4 bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
        <div className="header-logo flex justify-between">
          <div>
            <Image src={IconLogo} alt="logo" width={28} height={24} />
          </div>
          <InfoWalletNFT />
        </div>
        <div className="mt-[16px]">
          <h1 className="text-[24px] font-bold text-white">{t("Privacy Policy")}</h1>
        </div>
      </div>

      <div className="pt-6 px-6  text-[#1E0E39] text-[16px] montserrat-regular w-full">
        <div className="container-scroll flex flex-col bg-[#F2F3F8] rounded-lg px-4 py-2  overflow-y-scroll h-[calc(100vh-219px)]" ref={containerRef}>
          <div>
            <div className="montserrat-regular text-[14px] text-[#1E0E39]">
              <div className="font-bold mb-4 border-b border-solid border-[#DBDFE4]">
                <p className="mb-3">{t("Privacy Policy for")} DeFily.ai </p>
                <p className="pb-4">{t("EFFECTIVE DATE")}: 04/08/2024</p>
              </div>

              <p>{t("AtDefily Privacy Policy")}</p>
            </div>

            <div className="p-2 rounded-[10px] border border-solid border-[#AD98FF] mt-4">
              <p className="montserrat-regular text-[16px] text-[#1E0E39]">{t("By using you agree to this Privacy Policy")}</p>
            </div>
          </div>

          <div className="mt-4 border-t border-solid border-[#DBDFE4] pt-4">
            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">1</p>
                <span className="font-bold">{t("Information We Collect")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Wallet Information")}:</span>{" "}
                {t("We access your wallet address and transaction data when you connect your crypto wallet to our platform")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Technical Data")}:</span> {t("We may collect data such as your IP address")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">2</p>
                <span className="font-bold">{t("How We Use Your Information")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Service Delivery")}:</span> {t("To provide and enhance our decentralized services")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Communication")}:</span> {t("To send updates or notifications related to your account and services")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">3</p>
                <span className="font-bold">{t("Data Security Protection Measures")}</span>
              </div>
              <p className="mt-4">{t("We implement security measures to protect your data")}</p>
              <p className="mt-4">
                <span className="font-bold">{t("Decentralized Control")}:</span> {t("We do not control or store your wallet data directly")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">4</p>
                <span className="font-bold">{t("Sharing your Information")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Third Parties")}:</span> {t("Our services may interact with external Web3 protocols")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">5</p>
                <span className="font-bold">{t("Your Rights")}</span>
              </div>
              <p className="mt-4">
                <span className="font-bold">{t("Manage Preferences")}:</span> {t("You can manage your cookie settings through your browser")}
              </p>
              <p className="mt-4">
                <span className="font-bold">{t("Data Control")}:</span>{" "}
                {t("You control your wallet and transaction data through your wallet provider")}
              </p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">6</p>
                <span className="font-bold">{t("Updates to This Policy")}</span>
              </div>
              <p className="mt-4">{t("We may update this Privacy Policy periodically")}</p>
            </div>

            <div className="py-4 border-b border-solid border-[#F2F3F8]">
              <div className="flex items-center">
                <p className="rounded-full w-[30px] h-[30px] bg-[#1E0E39] text-white font-bold flex justify-center items-center mr-2">7</p>
                <span className="font-bold">{t("Contact Us")}</span>
              </div>
              <p className="mt-4">
                {t("For questions about this Privacy Policy please contact us at")} <span className="font-bold">{t("Email")} info@defily.ai</span>
              </p>
              <p className="mt-4">{t("By using you agree to this Privacy Policy")}</p>
            </div>
          </div>
        </div>
        <div className="container-btn flex justify-between mt-6">
          <div className="container-btnClose w-2/6">
            <ButtonSecondary text={t("Back")} onClickFn={() => backToTermsAndConditions()} classname="buttonBack" />
          </div>

          <div className="container-btnAgree w-4/6 ml-4">
            <ButtonPrimary text={t("I Agree")} onClickFn={() => acceptTerms()} disabled={!isScrolledToBottom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
