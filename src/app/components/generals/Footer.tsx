"use client";
import React, { ReactNode, useEffect, useState } from "react";
import HomeSVG from "@/assets/icons/HomeIcon";
import OptionsSVG from "@/assets/icons/OptionsIcon";
import AddSVG from "@/assets/icons/AddIcon";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import WomanSvg from "@/assets/icons/WomenSvg";
import ManSvg from "@/assets/icons/ManSvg";
import { useTranslations } from "next-intl";
import WalletIcon from "@/assets/icons/WalletIcon";
import { useUser } from "../web3/context/UserProvider";
import { client } from "../web3/client";
import { useWalletDetailsModal } from "thirdweb/react";
import ModalComponent from "./ModalComponent";
import RelojGif from "@/assets/imgs/reloj-de-bolsillo.gif";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import { Div } from "../../../utils/countries";

type ListOptions = {
  title: string;
  icon?: ReactNode;
  image?: ReactNode;
  link?: string;
  isButton?: boolean;
  onClick?: () => void;
};

const Footer = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const search = useSearchParams().get("type");
  const [genderPhoto, setGenderPhoto] = useState<string | null>(null);
  const [decryptedImg, setDecryptedImg] = useState<string | null>(null);
  const [wallet, setWallet] = useState("");
  const { user } = useUser();
  const detailsModal = useWalletDetailsModal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (wallet) {
      setWallet(wallet);
    }
  }, [wallet]);

  const getInfo = async () => {
    setGenderPhoto(user.gender);
    if (user.imageLink) {
      setDecryptedImg(user.imageLink + "?" + new Date().getTime());
    }
  };

  useEffect(() => {
    getInfo();
  }, [user]);

  const ImgGender = () => {
    if (genderPhoto === t("Female")) {
      return <WomanSvg fill={pathname === "/profile" ? "#7A2FF4" : "#A9AEB4"} />;
    } else {
      return <ManSvg fill={pathname === "/profile" ? "#7A2FF4" : "#A9AEB4"} />;
    }
  };

  const IconValue = () => {
    if (!decryptedImg) {
      return <ImgGender />;
    }

    return <Image width={28} height={28} src={decryptedImg} alt="profile" />;
  };

  const listOptions: ListOptions[] = [
    {
      title: "Dashboard",
      icon: <HomeSVG fill={pathname === "/dashboard" ? "#7A2FF4" : "#A9AEB4"} />,
      link: "/dashboard",
    },
    {
      title: "Menu",
      icon: <OptionsSVG fill={pathname === "/menu" ? "#7A2FF4" : "#A9AEB4"} />,
      link: `/menu`,
    },
    {
      title: "My Stakes",
      icon: <AddSVG fill={search === "stake" ? "#7A2FF4" : "#A9AEB4"} stroke={search === "stake" ? "#7A2FF4" : "#A9AEB4"} />,
      link: "/stakes?type=stake",
    },
    {
      title: "Wallet",
      icon: <WalletIcon fill={search === "myLiquidity" ? "#7A2FF4" : "#A9AEB4"} />,
      isButton: true,
      onClick: () => detailsModal.open({ client }),
    },
    {
      title: "Profile",
      image: decryptedImg && decryptedImg !== "" ? <Image width={28} height={28} src={decryptedImg} alt="profile" /> : <ImgGender />,
      link: `/profile`,
      icon: <IconValue />,
    },
  ];

  return (
    <div className="footer lg:max-w-[360px] lg:mx-auto z-10">
      {listOptions.map((item, index) =>
        item.isButton ? (
          <button className="container-icon" onClick={item.onClick} key={index}>
            <div className={`${item.image ? "imgProfile" : ""}`}>{item.icon}</div>
          </button>
        ) : (
          // ) : item.title === "My Stakes" ? (
          //   <div
          //     key={index}
          //     className={`container-icon object-cover ${item.link === "/stakes?type=stake" ? "linkAdd" : ""} ${
          //       item.link === "/stakes?type=stake" && search === "stake" ? "--linkAdd" : ""
          //     }`}
          //     onClick={() => setIsModalOpen(true)}
          //   >
          //     {item.icon ? item.icon : item.image}
          //   </div>
          <Link href={item?.link || "/"} key={index} className="link">
            <div
              className={`container-icon object-cover ${item.link === "/stakes?type=stake" ? "linkAdd" : ""} ${
                item.link === "/stakes?type=stake" && search === "stake" ? "--linkAdd" : ""
              } ${item.image ? "imgProfile" : ""}`}
            >
              {item.icon ? item.icon : item.image}
            </div>
          </Link>
        )
      )}

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[240px] h-[240px] rounded-xl">
        <div className="container-modal">
          <div className="container-icon-close cursor-pointer w-6 float-right pt-2" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <Image src={RelojGif} alt="Reloj" width={132} height={132} />
            <p className="text-center text-[18px] font-bold text-[#A9AEB4] italic mt-[20px]">{t("Coming soon")}!</p>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Footer;
