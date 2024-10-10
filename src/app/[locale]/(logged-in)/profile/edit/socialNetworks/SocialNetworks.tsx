"use client";
import React, { useEffect, useState } from "react";
import ModalComponent from "@/app/components/generals/ModalComponent";
import { useTranslations } from "next-intl";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useRouter, useSearchParams } from "next/navigation";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import Image from "next/image";
import FaceIcon from "@/assets/icons/logo-facebookWhite.svg";
import InstagramIcon from "@/assets/icons/logo-instagramWhite.svg";
import YoutubeIcon from "@/assets/icons/logo-youtubeWhite.svg";
import TiktokIcon from "@/assets/icons/logo-tiktokWhite.svg";
import WhatsappIcon from "@/assets/icons/logo-whatsappWhite.svg";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useUser } from "@/app/components/web3/context/UserProvider";
import { useUpdatePoi } from "@/app/components/web3/hooks/useUpdatePoi";
import { validateUrl } from "@/utils/value_object_register_steps";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";

const SocialNetworks = () => {
  const t = useTranslations();
  const { user } = useUser();
  const { updatePoi } = useUpdatePoi();
  const router = useRouter();
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [error, setError] = useState("");

  const [fieldError, setFieldError] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    whatsapp: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

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
      fbLink: facebook,
      igLink: instagram,
      youtubeLink: youtube,
      yTWelcomeLink: "",
      tikTokLink: tiktok,
      wspLink: whatsapp,
    });

    if (errors) {
      console.log(errors);
      setIsDeclined(true);
      setIsProcessing(false);

      if (errors.fbLink) {
        setFieldError((prevError) => ({ ...prevError, facebook: errors.fbLink! }));
      }

      if (errors.igLink) {
        setFieldError((prevError) => ({ ...prevError, instagram: errors.igLink! }));
      }

      if (errors.youtubeLink) {
        setFieldError((prevError) => ({ ...prevError, youtube: errors.youtubeLink! }));
      }

      if (errors.tikTokLink) {
        setFieldError((prevError) => ({ ...prevError, tiktok: errors.tikTokLink! }));
      }

      if (errors.wspLink) {
        setFieldError((prevError) => ({ ...prevError, whatsapp: errors.wspLink! }));
      }

      setError(
        errors?.email || errors?.fullName || errors?.phone || errors?.country || errors?.gender || errors?.dateOfBirth || errors?.message || ""
      );
      return;
    }

    setIsProcessing(false);
    setIsModalOpen(false);

    router.push("/profile");
  };

  useEffect(() => {
    setFacebook(user.fbLink);
    setInstagram(user.igLink);
    setYoutube(user.youtubeLink);
    setTiktok(user.tikTokLink);
    setWhatsapp(user.wspLink);
  }, [user]);

  function getValueInputFacebook(value: string) {
    const valueFacebook = validateUrl(value);

    setFacebook(value);

    if (valueFacebook) {
      setFieldError({
        ...fieldError,
        facebook: valueFacebook,
      });
    } else {
      setFieldError({
        ...fieldError,
        facebook: "",
      });
    }
  }

  function getValueInputInstagram(value: string) {
    const valueInstagram = validateUrl(value);

    setInstagram(value);

    if (valueInstagram) {
      setFieldError({
        ...fieldError,
        instagram: valueInstagram,
      });
    } else {
      setFieldError({
        ...fieldError,
        instagram: "",
      });
    }
  }

  function getValueInputYoutube(value: string) {
    const valueYoutube = validateUrl(value);

    setYoutube(value);

    if (valueYoutube) {
      setFieldError({
        ...fieldError,
        youtube: valueYoutube,
      });
    } else {
      setFieldError({
        ...fieldError,
        youtube: "",
      });
    }
  }

  function getValueInputTiktok(value: string) {
    const valueTiktok = validateUrl(value);

    setTiktok(value);

    if (valueTiktok) {
      setFieldError({
        ...fieldError,
        tiktok: valueTiktok,
      });
    } else {
      setFieldError({
        ...fieldError,
        tiktok: "",
      });
    }
  }

  function getValueInputWhatsapp(value: string) {
    const valueWhatsapp = validateUrl(value);

    setWhatsapp(value);

    if (valueWhatsapp) {
      setFieldError({
        ...fieldError,
        whatsapp: valueWhatsapp,
      });
    } else {
      setFieldError({
        ...fieldError,
        whatsapp: "",
      });
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setIsProcessing(false);
    setIsDeclined(false);
  }

  return (
    <div className="pb-[88px]  bg-gradient-to-t from-[#0E0E33] to-[#39307B] text-white min-h-screen flex flex-col justify-between">
      <HeaderPages text={t("Edit Socials")} linkRouter="/profile" />

      <div className="px-6 ">
        <form className="container-form rounded-[16px] p-3 bg-gradient-to-t from-[#ffffff1a] to-[#39307B] text-white">
          <div className="container-input-labe text-[14px] mb-4">
            <div className="flex items-center  mb-1">
              <Image width={18} height={18} src={FaceIcon} alt="facebook" />
              <label className="font-bold ml-[2px]">Facebook</label>
            </div>
            <input
              className="w-full p-4 rounded-[10px] bg-[#ffffff1a] text-[#A9AEB4]"
              type="text"
              name="facebook"
              id="facebook"
              placeholder="facebook.com/stevejobs"
              required
              value={facebook}
              onChange={(e) => getValueInputFacebook(e.target.value)}
            />
            <p className="textErrorInputDark">{fieldError.facebook}</p>
          </div>
          <div className="container-input-labe text-[14px] mb-4">
            <div className="flex items-center mb-1">
              <Image width={18} height={18} src={InstagramIcon} alt="instagram" />
              <label className="font-bold ml-[2px]">Instagram</label>
            </div>
            <input
              className="w-full p-4 rounded-[10px] bg-[#ffffff1a] text-[#A9AEB4]"
              type="text"
              name="instagram"
              id="instagram"
              placeholder="instagram.com/stevejobs"
              required
              value={instagram}
              onChange={(e) => getValueInputInstagram(e.target.value)}
            />
            <p className="textErrorInputDark">{fieldError.instagram}</p>
          </div>
          <div className="container-input-labe text-[14px] mb-4">
            <div className="flex items-center mb-1">
              <Image width={18} height={18} src={YoutubeIcon} alt="youtube" />
              <label className="font-bold ml-[2px]">YouTube</label>
            </div>
            <input
              className="w-full p-4 rounded-[10px] bg-[#ffffff1a] text-[#A9AEB4]"
              type="text"
              name="youtube"
              id="youtube"
              placeholder="youtube.com/stevejobs"
              required
              value={youtube}
              onChange={(e) => getValueInputYoutube(e.target.value)}
            />
            <p className="textErrorInputDark">{fieldError.youtube}</p>
          </div>
          <div className="container-input-labe text-[14px] mb-4">
            <div className="flex items-center mb-1">
              <Image width={18} height={18} src={TiktokIcon} alt="tiktok" />
              <label className="font-bold ml-[2px]">TikTok</label>
            </div>
            <input
              className="w-full p-4 rounded-[10px] bg-[#ffffff1a] text-[#A9AEB4]"
              type="text"
              name="tiktok"
              id="tiktok"
              placeholder="tiktok.com/stevejobs"
              required
              value={tiktok}
              onChange={(e) => getValueInputTiktok(e.target.value)}
            />
            <p className="textErrorInputDark">{fieldError.tiktok}</p>
          </div>
          <div className="container-input-labe text-[14px] ">
            <div className="flex items-center mb-1">
              <Image width={18} height={18} src={WhatsappIcon} alt="whatsapp" />

              <label className="font-bold ml-[2px]">Whatsapp</label>
            </div>
            <input
              className="w-full p-4 rounded-[10px] bg-[#ffffff1a] text-[#A9AEB4]"
              type="text"
              name="whatsapp"
              id="whatsapp"
              placeholder="wa.me/44221232323"
              required
              value={whatsapp}
              onChange={(e) => getValueInputWhatsapp(e.target.value)}
            />
            <p className="textErrorInputDark">{fieldError.whatsapp}</p>
          </div>
        </form>
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
            <div className="w-full h-full flex flex-col items-center justify-center ">
              <div>
                <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Saving your New Socials Information")}...</p>
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
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Socials Information Succesfully Saved")}!</p>
            </div>
          )}
        </ModalComponent>
      </div>
    </div>
  );
};

export default SocialNetworks;
