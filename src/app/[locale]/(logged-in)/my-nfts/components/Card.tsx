"use client";
import React, { useState } from "react";
import { InfoUserNfts } from "./mockData";
import Image from "next/image";
import EyeSeeMore from "@/assets/icons/eye.svg";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import ModalComponent from "@/app/components/generals/ModalComponent";
import { useTranslations } from "next-intl";
import IconReferral from "@/assets/icons/iconLinkReferral.svg";
import IconTransfer from "@/assets/icons/iconTransfer.svg";
import IconMetamask from "@/assets/icons/Metamask.svg";
import { useRouter } from "next/navigation";
import directIcon from "@/assets/icons/directVolNftI.png";
import globalIcon from "@/assets/icons/globalVolNft.svg";

interface Props {
  user: InfoUserNfts;
}

const Card = ({ user }: any) => {
  const t = useTranslations();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userModal, setUserModal] = useState<InfoUserNfts>({} as InfoUserNfts);
  const [isModalOpenCopy, setIsModalOpenCopy] = useState(false);

  const buttonSeeMore = (infoUser: InfoUserNfts) => {
    if (!isModalOpen && userModal) {
      setIsModalOpen(true);
      setUserModal(infoUser);
    }
  };

  const copyReferralLink = (linkReferral: string) => {
    navigator.clipboard.writeText(linkReferral);
    console.log(linkReferral);
    setIsModalOpenCopy(true);

    setTimeout(() => {
      setIsModalOpenCopy(false);
    }, 2000);
  };

  const buttonTransfer = () => {
    router.push("/my-nfts/transfer");
  };

  return (
    <div className="p-2 bg-[#ffffff1a] rounded-[10px] border border-solid border-[#AD98FF] min-w-[132px] w-[87%] text-white ">
      <div className="py-3 px-2 bg-[#ffffff1a] rounded-[10px] border border-solid border-[#ffffff1a]">
        <div className="flex justify-center items-center relative">
          <div className="w-[48px] h-[48px] rounded-[100px] border-[2px] border-solid border-[#ffffff1a] bg-cover ">
            <Image src={`${user?.imageNft}`} alt="Image Nft" className="object-cover rounded-[100px] w-full h-full" width={48} height={48} />
            {/* <img style={{borderRadius:"50px"}} src={user.imageNft} alt="" /> PONER IMAGE LEADYS */}
          </div>
          <div
            className="w-[32px] h-[32px] rounded-[100px] bg-gradient-to-t from-[#AD98FF] to-[#612DFE] flex justify-center items-center cursor-pointer"
            onClick={() => buttonSeeMore(user)}
          >
            <Image src={EyeSeeMore} alt="See More" />
          </div>
        </div>

        <p className="text-center text-[10px] font-bold px-[10px] py-1 rounded-[20px] bg-[#ffffff1a] mt-2">{user.nameAccount}</p>
        <p className="text-center text-[9px] font-bold px-[10px] py-1 rounded-[20px] bg-[#7573A6] my-2">{user.levelCurrent}</p>

        <div className="text-center text-[9px]">
          <p>{t("SPONSOR NFT")}</p>
          <div className="mt-[2px]">
            <span className="text-[8px] px-[6px] bg-[#ffffff1a] rounded-[4px]">{user.sponsorNFTId}</span>
            <span className="font-bold ml-1 ">{user.sponsorNFTName}</span>
          </div>
        </div>
      </div>

      <div className="mt-[10px] w-[88%]">
        <button
          className="flex items-center px-2 py-[6px] rounded-[6px] text-[8px] font-bold bg-gradient-to-t from-[#AD98FF] to-[#612DFE] w-full cursor-pointer"
          onClick={() => copyReferralLink(user.referralLink)}
        >
          <Image src={IconReferral} alt="Referral" className="mr-2" /> {t("Referral Link")}
        </button>

        <button
          className="flex items-center px-2 py-[6px] rounded-[6px] text-[8px] font-bold text-[#7A2FF4] bg-white w-full my-[10px] cursor-pointer"
          onClick={buttonTransfer}
        >
          <Image src={IconTransfer} alt="Transfer" className="mr-2" /> {t("Transfer")}
        </button>

        <button
          className="flex items-center px-2 py-[6px] rounded-[6px] text-[8px] font-bold text-[#7A2FF4] bg-white w-full cursor-pointer"
          onClick={() => {}}
        >
          <Image src={IconMetamask} alt="Export" className="mr-2 w-[14px] h-[15px]" /> {t("Export")}
        </button>
      </div>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[310px] rounded-xl">
        <div className="container-modal">
          <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>

          <div className="flex flex-col items-center py-8 px-6">
            <div>
              <div className="h-[112px] w-[112px] mx-auto rounded-[100px] border border-[#7A2FF4]">
                {/* <Image src={userModal.imageNft} alt="Image Nft" className="object-cover rounded-[100px] w-full h-full" /> */}
                <img style={{ borderRadius: "50px" }} src={user.imageNft} alt="" />
              </div>

              <h2 className="my-[10px] text-[16px] font-bold py-1 px-4 rounded-[20px] border border-solid border-[#7A2FF4]">
                {userModal.nameAccount}
              </h2>

              <div className="text-[12px] rounded-[20px] bg-[#7573A6] px-[10px] py-1  text-white flex items-center justify-center">
                {userModal.levelCurrent} <Image src={""} alt="level" className="ml-2 h-4 w-4" />
              </div>

              <p className="mt-[10px] text-[14px] text-center text-[#1E0E39]">
                {user.address ? `${user.address.substring(0, 6)}...${user.address.substring(user.address.length - 6)}` : ""}
              </p>
            </div>

            <div className="my-8 grid w-full grid-cols-2 gap-[10px]">
              <div className="rounded-[6px] bg-[#F2F3F8] px-2 py-[6px] text-center text-[#1E0E39]">
                <p className="text-[10px] mb-1">{t("LEVEL")}</p>
                {/* <p className="text-[12px] font-bold">{userModal.level}</p> */}
                <p className="text-[12px] font-bold">{"1"}</p>
              </div>
              <div className="rounded-[6px] bg-[#9D87F6] px-2 py-[6px] text-center text-white">
                <p className="text-[10px] mb-1">{t("Account Type").toLocaleUpperCase()}</p>
                {/* <p className="text-[12px] font-bold ">{userModal.accountType}</p> */}
                <p className="text-[12px] font-bold ">{"Own"}</p>
              </div>
              <div className="rounded-md bg-gray-100 p-2 text-center text-[#1E0E39]">
                <p className="text-[10px] mb-1">{t("User").toLocaleUpperCase()}</p>
                <div>
                  <span className="text-[8px] px-[6px] border border-solid border-[#A9AEB4] rounded-[4px]">{userModal.idAccount}</span>
                  <span className=" text-[9px] font-bold ml-1 ">{userModal.nameAccount}</span>
                </div>
              </div>
              <div className="rounded-md bg-gray-100 p-2 text-center text-[#1E0E39]">
                <p className="text-[10px] mb-1">{t("SPONSOR NFT").toLocaleUpperCase()}</p>
                <div>
                  <span className="text-[8px] px-[6px] border border-solid border-[#A9AEB4] rounded-[4px]">{user.sponsorNFTId}</span>
                  <span className=" text-[9px] font-bold ml-1 ">{user.sponsorNFTName}</span>
                </div>
              </div>
              <div className="rounded-[6px] bg-[#32BB1B] px-2 py-[6px] text-center text-white">
                <p className="text-[10px] mb-1">{t("Memberships").toLocaleUpperCase()}</p>
                <p className="text-[12px] font-bold">{userModal.memberships}</p>
              </div>
              <div className="rounded-[6px] bg-[#622BBB] px-2 py-[6px] text-center text-white">
                <p className="text-[10px] mb-1">{t("Stakes").toLocaleUpperCase()}</p>
                <p className="text-[12px] font-bold">{userModal.stakes}</p>
              </div>
            </div>

            <div className=" flex w-full justify-center  text-[12px] text-[#554D77]">
              <div className="flex items-center mr-8">
                <Image src={directIcon} alt="Direct vol" className="mr-1 h-4 w-4" />
                <p className=" ">{t("DIRECTS VOL")}.</p>
              </div>
              <div className="flex items-center">
                <Image src={globalIcon} alt="Global vol" className="mr-1 h-4 w-4" />
                <p className=" ">{t("GLOBAL VOL")}.</p>
              </div>
            </div>

            <div className="flex w-full text-[12px] font-bold">
              <div className=" text-center w-full">
                <p className="my-1  mx-auto rounded-full border border-solid border-[#7A2FF4] w-[20px] h-[20px] text-[#7A2FF4] flex items-center justify-center">
                  {userModal.directsVolume?.count}
                </p>
                <p className="text-[14px] font-bold">${userModal.directsVolume?.amount}</p>
              </div>
              <div className="text-center w-full">
                <p className="my-1 mx-auto rounded-full bg-[#7A2FF4] w-[20px] h-[20px] text-white flex items-center justify-center">
                  {userModal.globalVolume?.count}
                </p>
                <p className="text-[14px] font-bold">${userModal.globalVolume?.amount}</p>
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>

      <ModalComponent isOpen={isModalOpenCopy} setIsOpen={setIsModalOpenCopy} classBody="bg-white w-[285px] rounded-xl">
        <div className="container-modal">
          <div className="p-6">
            <p className="text-[16px] text-[#554D77] text-center">{t("You successfully copied the referral link")} </p>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Card;
