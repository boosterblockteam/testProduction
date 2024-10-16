"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CamaraFoto from "@/assets/imgs/camera-reverse.png";
import WomanSvg from "@/assets/icons/woman.svg";
import ManSvg from "@/assets/icons/man.svg";
import { useTranslations } from "next-intl";
import { ServiceProvider } from "@/app/components/providers/service.provider";
import { useUser } from "@/app/components/web3/context/UserProvider";
import { useUpdateUserImage } from "@/app/components/web3/hooks/useUpdateUserImage";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";

export interface ProfilePicProps {
  src?: string;
}

export default function ProfilePic({ src }: ProfilePicProps) {
  const t = useTranslations();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [genderPhoto, setGenderPhoto] = useState<string | null>(null);
  const { user, isLoadingUser } = useUser();
  const { updateUserImage } = useUpdateUserImage();
  const [decryptedImg, setDecryptedImg] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDeclined, setIsDeclined] = useState<boolean>(false);

  const handleFolderSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageInsert = event.target.files![0];

    if (imageInsert) {
      await uploadImageToImgbb(imageInsert);
    }

    openModalChangePhoto();
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (!isLoadingUser && user.address) {
      getInfo();
    }
  }, [isLoadingUser, user]);

  const uploadImageToImgbb = async (image: File) => {
    console.log("uploading image");
    const formData = new FormData();
    formData.append("image", image);
    const { poiService } = ServiceProvider.getInstance().getServices();
    try {
      const { poi } = await poiService.updateImage(user.address, formData);
      const { errors } = await updateUserImage(poi.imageLink);
      console.log({ errors });
      if (errors) {
        console.log(errors);
        return;
      }
      setDecryptedImg(poi.imageLink + "?" + new Date().getTime());
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    console.log(user);
    setGenderPhoto(user.gender);
    if (user.imageLink) {
      setDecryptedImg(user.imageLink + "?" + new Date().getTime());
    }
  };

  useEffect(() => {
    getInfo();
  }, [user]);

  const imgGender = () => {
    if (genderPhoto === t("Female")) {
      return WomanSvg;
    } else {
      return ManSvg;
    }
  };

  const openModalChangePhoto = () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 6000);
  };

  return (
    <div className="container-img relative border border-1 border-[#39307b] mb-4">
      <Image
        src={decryptedImg ? decryptedImg : imgGender()}
        className="photoUser object-cover rounded-[50%] h-[120px]"
        alt=""
        width={120}
        height={120}
      />
      <div className="camara-container bg-[#7A2FF4] p-2 rounded-[20px] w-[32px] absolute right-0 bottom-4">
        <Image className="camara cursor-pointer" src={CamaraFoto} alt="" onClick={handleImageClick} width={18} height={18} />
      </div>
      <input
        id="folder-select"
        type="file"
        onChange={handleFolderSelect}
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/webp"
      />

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
        {isDeclined && (
          <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
        )}
        {isProcessing ? (
          <div className="w-full h-full flex flex-col items-center justify-center px-16">
            <div>
              <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Uploading your New Profile Picture")}...</p>
          </div>
        ) : isDeclined ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div>
              <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Profile Picture uploaded un-successfully")}!</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div>
              <Image src={CheckDone} alt="Check done" width={60} height={60} />
            </div>
            <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Profile Picture uploaded successfully")}!</p>
          </div>
        )}
      </ModalComponent>
    </div>
  );
}
