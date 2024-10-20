"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Image from "next/image";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { useUserRegisterStore } from "@/store/user-register";
import abiAccount from "@/abis/abiAccount.json";
import { ThirdwebSDK } from "@thirdweb-dev/react";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { useRegister } from "@/app/components/web3/hooks/register/useRegister";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";
import { useNFTSelectionSocket } from "@/app/components/socket/useNFTSelectionSocket";
import { NftToBuy } from "../types/nft-to-buy";

interface Props {
  setStepNft: (value: number) => void;
  selectedNFT: NftToBuy | null;
  setSelectedNFT: (value: any) => void;
  listNftBuy: NftToBuy[];
}

const AccountPaymentNFT = ({ setStepNft, selectedNFT, setSelectedNFT, listNftBuy }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [nameYourNFT, setNameYourNFT] = useState<string>("");
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [selectedImagesFroRegister, setSelectedImagesFroRegister] = useState<number[]>([]);
  const [filteredNftBuy, setFilteredNftBuy] = useState<NftToBuy[]>([]);
  const { isConnected, nftSelectionSocket } = useNFTSelectionSocket();

  const { loadBuyNftParams, getRegisterFormsData } = useRegister();

  useEffect(() => {
    fillFormFromLocalStorageIfExists();
    nftImages();
  }, [listNftBuy]);

  useEffect(() => {
    // Filtra los NFTs después de obtener las imágenes ya compradas
    const filteredList = listNftBuy.filter((item) => !selectedImages.includes(item.id));

    // Filtra los NFTs seleccionados por otros usuarios en Registro
    const filteredListFromRegister = filteredList.filter((item) => !selectedImagesFroRegister.includes(item.id));
    setFilteredNftBuy(filteredListFromRegister);
  }, [selectedImages, selectedImagesFroRegister]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    nftSelectionSocket.on("selectedNFTs", (ids: number[]) => {
      console.log("selectedNFTs", ids);
      setSelectedImagesFroRegister(ids);
    });

    const { accountParams } = getRegisterFormsData();

    if (accountParams) {
      nftSelectionSocket.emit("deselectNft", accountParams.nftNumber);
    }

    return () => {
      nftSelectionSocket.off("selectedNFTs");
    };
  }, [isConnected, nftSelectionSocket]);

  const selectImg = (id: number) => {
    localStorage.setItem(
      "nftSelected",
      id.toString() // Guarda email, nombre y usuario
    );
  };

  const buttonSelect = async () => {
    const { sponsor, legSideNumber } = getSponsoAndLegSideFromUrl();

    if (selectedNFT === null) {
      setError("Please select an NFT");
      return;
    }

    const errors = await loadBuyNftParams({
      nameAccount: nameYourNFT.toLowerCase(),
      sponsor,
      nftcid: selectedNFT.cid,
      legSide: legSideNumber,
      nftNumber: selectedNFT.id,
    });

    if (errors) {
      setError(errors.nameAccount || "");
      return;
    }
    nftSelectionSocket.emit("selectNft", selectedNFT.id);

    setStepNft(2);
  };

  const selectItemBuy = (item: NftToBuy) => {
    setSelectedNFT(item);
  };

  const numberByPage = 9;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: filteredNftBuy,
    numberByPage: numberByPage,
  });

  const nftImages = async () => {
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.ACCOUNT_CONTRACT!, abiAccount);
    const getSelectedImages = await contract.call("getSelectedImages", []);
    const selectedImagesArray = getSelectedImages.map((bn: any) => parseInt(bn._hex, 16));
    setSelectedImages(selectedImagesArray);

    // Filtra los NFTs después de obtener las imágenes ya compradas
    const filteredList = listNftBuy.filter((item) => !selectedImagesArray.includes(item.id));
    setFilteredNftBuy(filteredList);
  };

  function getValueInputNameYourNFT(value: string) {
    let userN = value.replace(/[^a-zA-Z0-9]/g, "");

    setNameYourNFT(userN);
    setError("");
  }

  function fillFormFromLocalStorageIfExists() {
    const { accountParams } = getRegisterFormsData();
    if (accountParams) {
      getValueInputNameYourNFT(accountParams.nameAccount);
      setSelectedNFT(null);
    }
  }

  function back() {
    let url = "/";
    if (pathname === "/purchaseNft") {
      const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
      url = `/register?sponsor=${sponsor}&legside=${legSide}`;
    } else if (pathname === "/my-nfts/buy-nft") {
      url = "/my-nfts";
    }
    router.push(url);
  }

  return (
    <div className={`flex flex-col justify-between ${pathname === "/purchaseNft" ? "min-h-[calc(100vh-111px)]" : "min-h-[calc(100vh-156px)]"} `}>
      <div>
        <div className={`mb-5 ${pathname === "purchaseNft" ? "mt-12" : ""}`}>
          <div className="mb-2 flex items-center">
            <p className="text-white font-bold text-center text-[10px] rounded-[20px] border border-solid border-[#ffffff1a] bg-[#ffffff1a] p-1 w-[18px] h-[18px]">
              1
            </p>
            <h1 className="text-[14px] font-bold ml-2">{t("NFT Account Name")}</h1>
          </div>
          <input
            type="text"
            value={nameYourNFT}
            onChange={(e) => getValueInputNameYourNFT(e.target.value)}
            placeholder=""
            className="rounded-[10px] p-4 bg-[#ffffff1a] w-full text-[#A9AEB4]"
          />
        </div>

        <div className="my-2 flex items-center">
          <p className="text-white font-bold text-center text-[10px] rounded-[20px] border border-solid border-[#ffffff1a] bg-[#ffffff1a] p-1 w-[18px] h-[18px]">
            2
          </p>
          <h1 className="text-[14px] font-bold ml-2">{t("Select your NFT Art")}</h1>
        </div>
        <div className="grid grid-cols-3 justify-items-center gap-y-4">
          {elemetsVisibleByPage.length === 0 ? (
            <p className="text-white text-[18px] text-center col-span-3">{t("Loading")}...</p>
          ) : (
            <>
              {elemetsVisibleByPage.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-lg flex flex-col items-center w-[92%] h-full p-[2px] ${
                    selectedNFT?.id === item.id ? "bg-[#7A2FF4]" : "bg-[#ffffff1a]"
                  }`}
                  onClick={() => {
                    selectItemBuy(item);
                    selectImg(item.id);
                  }}
                >
                  <div className="w-[100%] mx-auto">
                    <Image src={item.link} alt="NFT Image" width={84} height={84} className="mx-auto rounded-lg w-full" />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-[11px] text-white font-bold mt-1">#{index + 1}</p>
                    <p className="text-[11px] text-[#A9AEB4]">${item.price}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
            goToPreviousPage={goToPreviousPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <center className="mt-1">{error && <p className="textErrorInputDark">{error}</p>}</center>

        <div className="flex items-center">
          <div className="w-1/3">
            <ButtonSecondary text={t("Back")} onClickFn={() => back()} classname="buttonBack" />
          </div>

          <div className="w-2/3 ml-4">
            <ButtonPrimary text={t("Next")} onClickFn={buttonSelect} disabled={!selectedNFT || !nameYourNFT} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPaymentNFT;
