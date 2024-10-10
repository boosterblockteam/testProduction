"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ButtonPrimary from "../../../components/generals/ButtonPrimary";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import "react-phone-number-input/style.css";
import { validateEmail, validateFullName, validateUserName, validatePhoneNumber } from "@/utils/value_object_register_steps";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRegister } from "@/app/components/web3/hooks/register/useRegister";
import { useGetReferral } from "@/app/components/web3/hooks/useGetReferral";
import { ClipLoader } from "react-spinners";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";
import { useActiveWallet, useDisconnect } from "thirdweb/react";
import { useGetPoi } from "@/app/components/web3/hooks/useGetPoi";

const RegisterOne = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fieldError, setFieldError] = useState({
    email: "",
    fullName: "",
    username: "",
    phoneNumber: "",
  });
  const [phone, setPhone] = useState<string>("");
  const params = useSearchParams();
  const referral = params.get("sponsor") || "0";
  const { referralName, isLoadingGettingReferral } = useGetReferral(Number(referral));
  const { loadCreatePoiParams, getRegisterFormsData, createPoiFromStorage } = useRegister();
  const { poi, isLoading: isLoadingPoi } = useGetPoi();

  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  useEffect(() => {
    fillFormFromLocalStorageIfExists();
  }, []);

  useEffect(() => {
    if (isLoadingPoi) {
      return;
    }

    if (poi) {
      createPoiFromStorage();
      const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
      router.push(`/purchaseNft?sponsor=${sponsor}&legside=${legSide}`);
    }
  }, [isLoadingPoi, poi]);

  function getValueInputEmail(value: string) {
    const valueEmail = validateEmail(value);

    setEmail(value);

    if (valueEmail) {
      setFieldError({
        ...fieldError,
        email: valueEmail,
      });
    } else {
      setFieldError({
        ...fieldError,
        email: "",
      });
    }
  }

  function getValueInputFullName(value: string) {
    let fullNameI = value.replace(/[^A-Za-zñ\s]/g, "");
    const valueFullName = validateFullName(fullNameI);

    setFullName(fullNameI);

    if (valueFullName) {
      setFieldError({
        ...fieldError,
        fullName: valueFullName,
      });
    } else {
      setFieldError({
        ...fieldError,
        fullName: "",
      });
    }
  }

  function getValueInputUsername(value: string) {
    let userN = value.replace(/\s/g, "");
    const valueUsername = validateUserName(userN);

    setUsername(userN);

    if (valueUsername) {
      setFieldError({
        ...fieldError,
        username: valueUsername,
      });
    } else {
      setFieldError({
        ...fieldError,
        username: "",
      });
    }
  }

  const getValueInputPhoneNumber = (value: string) => {
    let number = value.replaceAll(" ", "");

    const valuePhoneNumber = validatePhoneNumber(number);

    setPhone(number);

    if (valuePhoneNumber) {
      setFieldError({
        ...fieldError,
        phoneNumber: valuePhoneNumber,
      });
    } else {
      setFieldError({
        ...fieldError,
        phoneNumber: "",
      });
    }
  };

  function fillFormFromLocalStorageIfExists() {
    const { poiParams } = getRegisterFormsData();
    if (poiParams) {
      getValueInputEmail(poiParams.email);
      getValueInputFullName(poiParams.fullName);
      getValueInputUsername(poiParams.username);
      getValueInputPhoneNumber(poiParams.phone);
    }
  }

  const sendDataValues = async () => {
    const errors = await loadCreatePoiParams({
      email,
      fullName,
      username,
      phone,
    });

    if (errors) {
      setFieldError({
        email: errors.email ?? "",
        fullName: errors.fullName ?? "",
        username: errors.username ?? "",
        phoneNumber: errors.phone ?? "",
      });
      return;
    }

    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();

    if (pathname === "/register") {
      const url = `/purchaseNft?sponsor=${sponsor}&legside=${legSide}`;
      router.push(url);
    } else {
      router.push(`/myTeam/new-partner/purchaseNft`);
    }
  };

  function backToWelcome() {
    if (wallet) {
      disconnect(wallet);
    }

    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
    const url = `/welcome?sponsor=${sponsor}&legside=${legSide}`;
    router.push(url);
  }

  return (
    <div
      className={`registerOne ${
        pathname === "/register" ? "min-h-[calc(100vh-140px)] px-6 py-6 mb-0" : "min-h-[calc(100vh-184px)] py-[20px] px-6 mb-16"
      }`}
    >
      <div>
        <div className="w-full mb-7">
          <p className="text-[14px] font-bold text-[#1E0E39] mb-1">{t("Sponsor")}</p>
          <div className="flex items-center justify-center ">
            <div className="py-2 px-4 rounded-lg bg-[#F2F3F8] w-2/6">
              <p className="text-[10px] font-bold text-[#A9AEB4]">{t("NFT ID")}</p>
              <p className="text-[14px] text-[#554D77]">{referral}</p>
            </div>
            <div className="py-2 px-4 rounded-lg border border-solid border-[#554D77] ml-1 w-4/6">
              <p className="text-[10px] font-bold text-[#A9AEB4]">{t("NFT Name")}</p>
              <p className="text-[14px] text-[#554D77]">
                <ClipLoader color="#39307B" loading={isLoadingGettingReferral} size={10} /> {referralName}
              </p>
            </div>
          </div>
        </div>

        <div className="container-input-label">
          <label htmlFor="">{t("Email Address")}</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={t("Email Address")}
            required
            value={email}
            onChange={(e) => getValueInputEmail(e.target.value)}
          />
          <p className="textErrorInput">{fieldError.email}</p>
        </div>
        <div className="container-input-label">
          <label htmlFor="">{t("Full Name")}</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder={t("Full Name")}
            required
            value={fullName}
            onChange={(e) => getValueInputFullName(e.target.value)}
          />
          <p className="textErrorInput">{fieldError.fullName}</p>
        </div>
        <div className="container-input-label">
          <label htmlFor="">{t("Username")}</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder={t("Username")}
            required
            value={username}
            onChange={(e) => getValueInputUsername(e.target.value)}
          />
          <p className="textErrorInput">{fieldError.username}</p>
        </div>
        <div className="container-input-label">
          <label htmlFor="">{t("Phone Number")}</label>
          <PhoneInput
            defaultCountry="MX"
            placeholder="Ej: 5585264448"
            value={phone}
            onChange={(value) => (value ? getValueInputPhoneNumber(value) : null)}
          />
          <p className="textErrorInput">{fieldError.phoneNumber}</p>
        </div>
      </div>

      <div className=" flex items-start justify-between mt-6">
        <div className="w-2/6">
          <ButtonSecondary text={t("Back")} onClickFn={() => backToWelcome()} classname="buttonBack" />
        </div>

        <div className="w-4/6 ml-4">
          {!email || !fullName || !username || !phone || fieldError.email || fieldError.fullName || fieldError.username || fieldError.phoneNumber ? (
            <ButtonPrimary text={t("Next")} disabled />
          ) : (
            <ButtonPrimary text={t("Next")} onClickFn={() => sendDataValues()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterOne;
