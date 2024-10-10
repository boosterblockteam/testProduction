"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FaceIcon from "@/assets/icons/logo-facebook.svg";
import InstagramIcon from "@/assets/icons/logo-instagram.svg";
import YoutubeIcon from "@/assets/icons/logo-youtube.svg";
import TiktokIcon from "@/assets/icons/logo-tiktok.svg";
import WhatsappIcon from "@/assets/icons/logo-whatsapp.svg";
import EditIcon from "@/assets/icons/Edit.svg";
import Link from "next/link";
import ModalComponent from "@/app/components/generals/ModalComponent";
import { useUser } from "@/app/components/web3/context/UserProvider";
import { useActiveWallet } from "thirdweb/react";

const DataBioWallet = () => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useUser();
  const [biogra, setBiogra] = useState("");
  const [isModalOpenCopyWallet, setIsModalOpenCopyWallet] = useState(false);
  const wallet = useActiveWallet();

  useEffect(() => {
    if (user.bio) {
      setBiogra(user.bio);
    }
  }, [user]);

  const btnChangeWallet = () => {
    router.push("/profile/changeWallet");
  };

  const copyWallet = () => {
    if (wallet) {
      navigator.clipboard.writeText(user.address);
      setIsModalOpenCopyWallet(true);

      setTimeout(() => {
        setIsModalOpenCopyWallet(false);
      }, 2000);
    }
  };

  return (
    <div className="">
      <div className="mb-6 mt-2">
        <div className="container-wallet mb-6">
          <div className="text-[#554D77] text-center text-[14px] mb-3">
            <span className="font-bold text-[14px]" onClick={copyWallet}>
              {t("Wallet")}:{" "}
              <span className="font-normal cursor-pointer">
                {user.address ? `${user.address.substring(0, 6)}...${user.address.substring(user.address.length - 6)}` : ""}
              </span>
            </span>
          </div>
          <div className="w-full text-center">
            <button
              onClick={btnChangeWallet}
              className="bgGradientPurpleMedium font-bold hover:bg-[#7a2ff4] text-white rounded-[10px] px-4 py-[10px] w-[89%]"
            >
              {t("Change your Wallet")}
            </button>
          </div>
        </div>

        <div className="container-social w-full flex justify-center gap-x-2 my-6 ">
          <Link
            href={user.fbLink || "/profile"}
            target={user.fbLink ? "_blank" : "_self"}
            className="border border-solid border-[#AD98FF] rounded-[5px] bg-white p-1 cursor-pointer w-[22px] flex justify-center items-center"
          >
            <Image width={18} height={18} src={FaceIcon} alt="facebook" />
          </Link>
          <Link
            href={user.igLink || "/profile"}
            target={user.igLink ? "_blank" : "_self"}
            className="border border-solid border-[#AD98FF] rounded-[5px] bg-white p-1 cursor-pointer w-[22px] flex justify-center items-center"
          >
            <Image width={18} height={18} src={InstagramIcon} alt="instagram" />
          </Link>
          <Link
            href={user.youtubeLink || "/profile"}
            target={user.youtubeLink ? "_blank" : "_self"}
            className="border border-solid border-[#AD98FF] rounded-[5px] bg-white p-1 cursor-pointer w-[22px] flex justify-center items-center"
          >
            <Image width={18} height={18} src={YoutubeIcon} alt="youtube" />
          </Link>
          <Link
            href={user.tikTokLink || "/profile"}
            target={user.tikTokLink ? "_blank" : "_self"}
            className="border border-solid border-[#AD98FF] rounded-[5px] bg-white p-1 cursor-pointer w-[22px] flex justify-center items-center"
          >
            <Image width={18} height={18} src={TiktokIcon} alt="tiktok" />
          </Link>
          <Link
            href={user.wspLink || "/profile"}
            target={user.wspLink ? "_blank" : "_self"}
            className="border border-solid border-[#AD98FF] rounded-[5px] bg-white p-1 cursor-pointer w-[22px] flex justify-center items-center"
          >
            <Image width={18} height={18} src={WhatsappIcon} alt="whatsapp" />
          </Link>
          <div
            className="container-img-edi p-2 rounded-[20px] bgGradientPurpleMedium w-4 h-4"
            onClick={() => router.push(`/profile/edit/socialNetworks`)}
          >
            <Image src={EditIcon} alt="edit" width={18} height={18} />
          </div>
        </div>

        <div className="container-bio mt-6 relative text-[#A9AEB4] text-[14px] rounded-[16px] bg-white shadow-md px-4 py-2 h-[230px] ">
          <div
            className="container-img-edi p-2 rounded-[20px] bgGradientPurpleMedium w-4 h-4 absolute -top-[5px] -right-[0px] cursor-pointer"
            onClick={() => {
              router.push(`/profile/edit/bio`);
            }}
          >
            <Image src={EditIcon} alt="edit" width={18} height={18} />
          </div>
          <p className="label font-bold mb-1">{t("Bio")}</p>
          {biogra ? (
            <textarea
              className="bio w-full h-[225px] py-2 px-4 overflow-y-scroll text-[#A9AEB4]"
              value={biogra}
              placeholder={t("Write your biography")}
            />
          ) : (
            <>{user.bio}</>
          )}
        </div>
      </div>

      <ModalComponent isOpen={isModalOpenCopyWallet} setIsOpen={setIsModalOpenCopyWallet} classBody="bg-white w-[285px] rounded-xl">
        <div className="container-modal">
          <div className="p-6">
            <p className="text-[16px] text-[#554D77] text-center">{t("You successfully copied the wallet")} </p>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default DataBioWallet;
