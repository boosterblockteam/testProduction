"use client";
import React from "react";
import Image from "next/image";
import IconLogo from "@/assets/imgs/LogoTipoPeq.png";
import { useTranslations } from "next-intl";
import InfoWalletNFT from "../generals/InfoWalletNFT";
import { usePathname } from "next/navigation";
import Navbar from "../generals/Navbar";

const HeaderRegister = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className={`headerRegister fixed top-0 z-50 w-full ${pathname === "/register" ? "" : "-heightNoRegister"} lg:max-w-[360px] lg:mx-auto`}>
      {pathname === "/register" ? (
        <div className="headerRegister-logo flex justify-between">
          <div className="flex items-center">
            <div>
              <Image src={IconLogo} alt="logo" width={28} height={24} />
            </div>
            <div className="ml-2">
              <div className="text-[12px] text-white">
                <p>
                  {t("STEP")} 1 {t("OF")} 5
                </p>
                <p className="text-[14px] text-[#20DABB] font-bold mt-1">{t("Registration")}</p>
              </div>
            </div>
          </div>
          <InfoWalletNFT />
        </div>
      ) : (
        <div className="headerRegister-logo">
          <Navbar text={t("New Partner")} />
        </div>
      )}

      <div className="headerRegister-title">
        <h1 className="text-[24px] font-bold">{t("welcome")}!</h1>
        <p>{t("Please complete the registration")}</p>
      </div>
    </div>
  );
};

export default HeaderRegister;
