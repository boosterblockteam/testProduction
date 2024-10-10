"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import {
  validateCountry,
  validateDateOfBirth,
  validateEmail,
  validateFullName,
  validateGender,
  validatePhoneNumber,
} from "@/utils/value_object_register_steps";
import { useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useUser } from "@/app/components/web3/context/UserProvider";
import { useUpdatePoi } from "@/app/components/web3/hooks/useUpdatePoi";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";

type Props = {
  allCountries: any[];
};

const EditProfile = ({ allCountries }: Props) => {
  const t = useTranslations();

  const { user } = useUser();
  const { updatePoi } = useUpdatePoi();

  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  const [fieldError, setFieldError] = useState({
    email: "",
    fullName: "",
    username: "",
    country: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setEmail(user.email);
    setFullName(user.fullName);
    setPhone(user.phone);
    setCountry(user.country);
    setGender(user.gender);
    setDateOfBirth(user.dateOfBirth);
  }, [user]);

  const buttonSaveChanges = async () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    const { errors } = await updatePoi({
      email,
      fullName,
      phone,
      country,
      gender,
      dateOfBirth,
      fbLink: "",
      igLink: "",
      youtubeLink: "",
      yTWelcomeLink: "",
      tikTokLink: "",
      wspLink: "",
      bio: "",
    });

    if (errors) {
      console.log(errors);
      setIsDeclined(true);
      setIsProcessing(false);

      if (errors.email) {
        setFieldError((prevError) => ({ ...prevError, email: errors.email! }));
      }

      if (errors.fullName) {
        setFieldError((prevError) => ({ ...prevError, fullName: errors.fullName! }));
      }

      if (errors.phone) {
        setFieldError((prevError) => ({ ...prevError, phone: errors.phone! }));
      }

      if (errors.country) {
        setFieldError((prevError) => ({ ...prevError, country: errors.country! }));
      }

      if (errors.gender) {
        setFieldError((prevError) => ({ ...prevError, gender: errors.gender! }));
      }

      if (errors.dateOfBirth) {
        setFieldError((prevError) => ({ ...prevError, dateOfBirth: errors.dateOfBirth! }));
      }

      setError(
        errors?.fbLink ||
          errors?.igLink ||
          errors?.youtubeLink ||
          errors?.yTWelcomeLink ||
          errors?.tikTokLink ||
          errors?.wspLink ||
          errors?.bio ||
          errors?.message ||
          ""
      );
      return;
    }

    setIsProcessing(false);
    setIsModalOpen(false);

    router.push("/profile");
  };

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
    const valueFullName = validateFullName(value);

    setFullName(value);

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

  const getValueInputCountry = (value: string) => {
    const valueCountry = validateCountry(value);
    setCountry(value);

    if (valueCountry) {
      setFieldError({
        ...fieldError,
        country: valueCountry,
      });
    } else {
      setFieldError({
        ...fieldError,
        country: "",
      });
    }
  };

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

  const getValueInputGender = (value: string) => {
    const valueGender = validateGender(value);

    setGender(value);

    if (valueGender) {
      setFieldError({
        ...fieldError,
        gender: valueGender,
      });
    } else {
      setFieldError({
        ...fieldError,
        gender: "",
      });
    }
  };

  const getValueInputDateOfBirth = (value: string) => {
    const valueDateOfBirth = validateDateOfBirth(value);
    setDateOfBirth(value);

    if (valueDateOfBirth) {
      setFieldError({
        ...fieldError,
        dateOfBirth: valueDateOfBirth,
      });
    } else {
      setFieldError({
        ...fieldError,
        dateOfBirth: "",
      });
    }
  };

  function closeModal() {
    setIsModalOpen(false);
    setIsProcessing(false);
    setIsDeclined(false);
  }

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen pb-[88px] flex flex-col justify-between">
      <div>
        <HeaderPages text={t("Edit Profile")} linkRouter="/profile" />

        <div className="edit-profile  px-6 pt-4">
          <form className="container-form-redes container-form">
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
              <label htmlFor="">{t("Phone Number")}</label>
              <PhoneInput
                defaultCountry="MX"
                placeholder="Ej: 5585264448"
                value={phone}
                onChange={(value) => (value ? getValueInputPhoneNumber(value) : null)}
              />
              <p className="textErrorInput">{fieldError.phoneNumber}</p>
              {fieldError.phoneNumber && <p className="textErrorInput">{t("This phone number is already in use, please choose another one")}</p>}
            </div>
            <div className="container-input-label">
              <label htmlFor="">{t("Country")}</label>
              <select name="country" id="country" required value={country} onChange={(e) => getValueInputCountry(e.target.value)}>
                {allCountries
                  ?.sort((a, b) => {
                    const aa = a.name.common;
                    const bb = b.name.common;

                    if (aa > bb) {
                      return 1;
                    }
                    if (aa < bb) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  })
                  .map((country, index) => (
                    <option key={index} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
              </select>
              <p className="textErrorInput">{fieldError.country}</p>
            </div>
            <div className="container-input-label">
              <label htmlFor="">{t("Gender")}</label>
              <select
                aria-label="Default select example"
                className="selectGender form-control"
                id="inputGender"
                value={gender}
                onChange={(e) => getValueInputGender(e.target.value)}
              >
                <option value={t("Gender")}>{t("Gender")}</option>
                <option value={t("Male")}>{t("Male")}</option>
                <option value={t("Female")}>{t("Female")}</option>
              </select>
              <p className="textErrorInput">{fieldError.gender}</p>
            </div>
            <div className="container-input-label">
              <label htmlFor="">{t("Date of Birth")}</label>
              <input
                type="date"
                name="username"
                id="username"
                placeholder={t("Select your Date of Birth")}
                required
                value={dateOfBirth}
                onChange={(e) => getValueInputDateOfBirth(e.target.value)}
              />
              <p className="textErrorInput">{fieldError.dateOfBirth}</p>
            </div>
          </form>
        </div>
      </div>

      <div className="px-6">
        <ButtonPrimary text={t("Save changes")} onClickFn={buttonSaveChanges} />

        <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
          {isDeclined && (
            <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => closeModal()}>
              <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
            </div>
          )}
          {isProcessing ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Saving your New Profile Information")}...</p>
            </div>
          ) : isDeclined ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{error}!</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={CheckDone} alt="Check done" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Profile Information Succesfully Saved")}!</p>
            </div>
          )}
        </ModalComponent>
      </div>
    </div>
  );
};

export default EditProfile;
