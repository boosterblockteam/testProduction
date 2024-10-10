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

export interface ProfilePicProps {
  src?: string;
}

export default function ProfilePic({ src }: ProfilePicProps) {
  const t = useTranslations();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [genderPhoto, setGenderPhoto] = useState<string | null>(null);
  const { user, isLoadingUser } = useUser();
  const { updateUserImage }  = useUpdateUserImage();
  const [decryptedImg, setDecryptedImg] = useState<string | null>(null);

  const handleFolderSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageInsert = event.target.files![0];

    if (imageInsert) {
      await uploadImageToImgbb(imageInsert);
    }
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
      console.log({errors});
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
    </div>
  );
}
