"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useUserRegisterStore } from "@/store/user-register";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useUpdatePoi } from "@/app/components/web3/hooks/useUpdatePoi";
import { useUser } from "@/app/components/web3/context/UserProvider";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";

const BioEdit = () => {
  const t = useTranslations();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [bio, setBio] = useState<string>("");
  const [fieldError, setFieldError] = useState({
    bio: "",
    message: "",
  });
  const { user } = useUser();
  const { updatePoi } = useUpdatePoi();

  const getUserRegisterStore = useCallback(useUserRegisterStore, []);

  //este useEffect solo lo utilizare hasta hacer el fetch de datos real

  useEffect(() => {
    setBio(user.bio);
  }, [user]);

  const buttonSaveChanges = async () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    const { errors } = await updatePoi({
      email: "",
      fullName: "",
      phone: "",
      country: "",
      gender: "",
      dateOfBirth: "",
      fbLink: "",
      igLink: "",
      youtubeLink: "",
      yTWelcomeLink: "",
      tikTokLink: "",
      wspLink: "",
      bio,
    });

    if (errors) {
      console.log(errors);
      setIsProcessing(false);
      setIsDeclined(true);
      
      if (errors.bio) {
        setFieldError(prevError => ({ ...prevError, bio: errors.bio! }));
      }
      
      if (errors.message) {
        setFieldError(prevError => ({ ...prevError, message: errors.message! }));
      }
      
      return;
    }

    setIsProcessing(false);
    setIsModalOpen(false);

    router.push("/profile");
  };

  function closeModal() {
    setIsModalOpen(false);
    setIsProcessing(false);
    setIsDeclined(false);
  }

  return (
    <div className="pb-[88px] bgGradientPurpleDark text-white">
      <HeaderPages text={t("Edit Bio")} linkRouter="/profile" />

      <div className="px-6 flex flex-col justify-center min-h-[calc(100vh-219px)]">
        <div className="bg-gradient-to-t from-[#ffffff1a] to-[#39307B] text-[14px] rounded-[16px] shadow-md p-3 h-[210px]">
          <div>
            <label className="font-bold">{t("Bio")}</label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Steve Jobs (1955-2011) was a visionary entrepreneur and co-founder of Apple Inc. He revolutionized the technology industry with innovative products such as the iPhone, iPad and Mac. He also led Pixar, transforming animated film. His focus on design and functionality left a lasting legacy."
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="rounded-[16px] bg-[#ffffff1a] w-full mt-1 text-[14px] text-[#A9AEB4]  h-[170px] px-4 py-2 overflow-y-scroll "
              maxLength={400}
            ></textarea>
          </div>
        </div>
      </div>
      <p className="textErrorInputDark">{fieldError.bio || fieldError.message || ""}</p>

      <div className="px-6">
        <ButtonPrimary text={t("Save changes")} onClickFn={buttonSaveChanges} />

        <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
          {isDeclined && (
            <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => closeModal()}>
              <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
            </div>
          )}
          {isProcessing ? (
            <div className="w-full h-full flex flex-col items-center justify-center px-16">
              <div>
                <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Saving your New Bio")}...</p>
            </div>
          ) : isDeclined ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Bio Unsuccesfully Saved")}!</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={CheckDone} alt="Check done" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Bio Succesfully Saved")}!</p>
            </div>
          )}
        </ModalComponent>
      </div>
    </div>
  );
};

export default BioEdit;
