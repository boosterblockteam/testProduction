"use client";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/app/components/generals/Navbar";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { DataMembers, datosUsersRef } from "./moskData";
import Countdown from "@/app/components/generals/Countdown";
import SelectSeason from "./SelectSeason";
import { getRankingAccountColor, getTypeAccountColor } from "@/utils/selectColorCardsMember";
import { RankingAccount } from "@/utils/moskData";
import HeaderPages from "@/app/components/generals/HeaderPages";
import CardDetailsHz from "./CardDetailsHz";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";

//imagenes
import ArrowUp from "@/assets/icons/ArrowUp.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import House from "@/assets/icons/home.svg";
import DirectVolSVG from "@/assets/icons/directVol.svg";
import SearchIcon from "@/assets/icons/search.svg";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import TrianguloSVG from "@/assets/icons/TrianguloColor";
import image1 from "@/assets/imgs/watch_gray.png";
import EmptyCard from "@/assets/icons/logoEmpty.svg";
import { cutAddress } from "@/app/components/web3/utils/cutAddress";
import { ServiceProvider } from "@/app/components/providers/service.provider";
import { useUser } from "@/app/components/web3/context/UserProvider";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { formatCurrencyInteger } from "@/utils/formatCurrency";
import { getTimeDifference } from "@/app/[locale]/(logged-in)/myTeam/utils/get-time-difference";
import { addSeconds } from "date-fns";

// const testNFTId: number | null = 0; // test: testNFTId
const testNFTId: number | null = null; // test: testNFTId
const mainWallet: string = ""; // test: wallet

const { myTeamService } = ServiceProvider.getInstance().getServices();
export interface UsersReferral {
  username: string;
  nftName: string;
  amountStake: string;
  NFTId: number;
  wallet: string;
  plan: string;
  image: string;
  upline: number;
  uplineAddress: string;
  numberOfReferralsTotal: number;
  numberOfReferralsL: number;
  numberOfReferralsR: number;
  referrals: UsersReferral[];
  MVL: number;
  PVL: number;
  MVR: number;
  PVR: number;
  position: "left" | "right";
  date: number;
  now: string;
  level: number;
  lvlAccount: RankingAccount;
}

export type Season = {
  num: number;
  start: Date;
  end: Date;
  now: Date;
}

const MyTeam = ({ type, infoUserLevel }) => {
  const t = useTranslations();
  const router = useRouter();

  const [searchInput, setSearchInput] = useState<string>("");
  const search = useSearchParams().get("type");
  const [dataFiltered, setDataFiltered] = useState(datosUsersRef);
  const [currentSeason, setCurrentSeason] = useState<number>(0);
  const [seasonOptions, setSeasonOptions] = useState<string[]>([t("All")]);
  const [selectedOptionSeason, setSelectedOptionSeason] = useState<string>(seasonOptions[0]);
  const [usersReferral, setUsersReferral] = useState<UsersReferral | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  const { user } = useUser();

  const [seeMoreButtonLeft, setSeeMoreButtonLeft] = useState<boolean>(false); //este estado ya guarda lo que necesitas del objeto de la izquierda
  const [seeMoreButtonRight, setSeeMoreButtonRight] = useState<boolean>(false); //este estado ya guarda lo que necesitas del objeto de la derecha
  const [seeMoreButtonHome, setSeeMoreButtonHome] = useState<boolean>(false);

  const buttomHandleSearch = () => {
    const searchParams = new URLSearchParams({ type });
    router.push(`/myTeam?${searchParams.toString()}`);
  };

  const filterByInput = useCallback((value: string) => {
    setSearchInput(value);
    const arrayToFilterAux = [...datosUsersRef];

    // FILTRANDO POR NOMBRE DE USUARIO
    let arrayToFilter = arrayToFilterAux.filter((item) => {
      return item.nameNft.toLowerCase().includes(value.toLowerCase()) || item.id.toString().includes(value.toLowerCase());
    });

    setDataFiltered(arrayToFilter);
  }, []);

  useEffect(() => {
    filterByInput("");
  }, [filterByInput]);

  useEffect(() => {
    if (usersReferral) {
      setSeeMoreButtonLeft(Boolean(usersReferral.referrals[0])); // aqui guardamos lo que necesitas del objeto de la izquierda
      setSeeMoreButtonRight(Boolean(usersReferral.referrals[1])); // aqui guardamos lo que necesitas del objeto de la derecha

      if (testNFTId !== null) {
        setSeeMoreButtonHome(testNFTId !== usersReferral?.NFTId); // test: usar la direccion de irving
      } else {
        setSeeMoreButtonHome(user?.selectedAccount?.idAccount !== usersReferral?.NFTId);
      }

    }
  }, [usersReferral]);

  useEffect(() => {
    loadSeason();
  }, []);

  useEffect(() => {
    loadUsersReferrals();
  }, [user]);

  async function loadSeason() {
    try {
      const { season, startSeason, endSeason, now } = await myTeamService.getSeason();

      setSeason({
        num: season,
        start: new Date(startSeason),
        end: new Date(endSeason),
        now: new Date(now),
      });
      setCurrentSeason(season);

      const seasonOptions = [t("All")];

      for (let i = 1; i <= season; i++) {
        seasonOptions.push(i.toString());
      }

      setSeasonOptions(seasonOptions)
      setSelectedOptionSeason(seasonOptions[seasonOptions.length - 1]);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadUsersReferrals() {
    try {
      if (testNFTId !== null) {
        const { usersReferral } = await myTeamService.getMyTeam(testNFTId, mainWallet); // test: usar la direccion de irving
        
        console.log({ usersReferral });

        setUsersReferral(usersReferral);

      } else if (user?.selectedAccount) {
        const { usersReferral } = await myTeamService.getMyTeam(user.selectedAccount.idAccount, user.selectedAccount.wallet);

        console.log({ usersReferral });

        setUsersReferral(usersReferral);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onClickButtonLeft() {
    console.log("seeMoreButtonLeft");

    if (testNFTId !== null) {
      const myTeamResponse = await myTeamService.getLastLeft(testNFTId, mainWallet); // test: usar la direccion de irving
      setUsersReferral(myTeamResponse.usersReferral);

    } else if (seeMoreButtonLeft && usersReferral && user?.selectedAccount) {
      const myTeamResponse = await myTeamService.getLastLeft(usersReferral.NFTId, user.selectedAccount.wallet);
      setUsersReferral(myTeamResponse.usersReferral);
    }
  }

  async function onClickButtonRight() {
    console.log("seeMoreButtonRight");

    if (testNFTId !== null) {
      const myTeamResponse = await myTeamService.getLastRight(testNFTId, mainWallet); // test: usar la direccion de irving
      setUsersReferral(myTeamResponse.usersReferral);

    } else if (seeMoreButtonRight && usersReferral && user?.selectedAccount) {
      const myTeamResponse = await myTeamService.getLastRight(usersReferral.NFTId, user.selectedAccount.wallet);
      setUsersReferral(myTeamResponse.usersReferral);
    }
  }

  async function onClickButtonHome() {
    console.log("seeMoreButtonHome");
    if (testNFTId !== null) {

      const myTeamResponse = await myTeamService.getMyTeam(testNFTId, mainWallet); // test: usar la direccion de irving
      setUsersReferral(myTeamResponse.usersReferral);

    } else if (user?.selectedAccount?.idAccount !== null && user?.selectedAccount?.idAccount !== undefined) {

      const myTeamResponse = await myTeamService.getMyTeam(user.selectedAccount.idAccount, user.selectedAccount.wallet);
      setUsersReferral(myTeamResponse.usersReferral);

    }
  }

  async function onClickButtonUp() {
    console.log("seeMoreButtonUp");

    if (testNFTId !== null && seeMoreButtonHome && (usersReferral?.upline !== null && usersReferral?.upline !== undefined)) {
      const myTeamResponse = await myTeamService.getMyTeam(usersReferral.upline, mainWallet); // test: usar la direccion de irving
      setUsersReferral(myTeamResponse.usersReferral);

    } else if (seeMoreButtonHome && (usersReferral?.upline !== null && usersReferral?.upline !== undefined) && user?.selectedAccount) {
      const myTeamResponse = await myTeamService.getMyTeam(usersReferral.upline, user.selectedAccount.wallet);
      setUsersReferral(myTeamResponse.usersReferral);
    }
  }

  async function onClickButtonUserCard(NFTId: number) {

    if (testNFTId !== null) {
      const myTeamResponse = await myTeamService.getMyTeam(NFTId, mainWallet); // test: usar la direccion de irving
      setUsersReferral(myTeamResponse.usersReferral);
      
    } else if (NFTId !== user?.selectedAccount?.idAccount && user?.selectedAccount) {
      const myTeamResponse = await myTeamService.getMyTeam(NFTId, user.selectedAccount.wallet);
      setUsersReferral(myTeamResponse.usersReferral);
    }
  }

  return (
    <div
      className={`${
        search === "search" ? "pt-0 px-0" : "pt-4 px-6"
      } pb-[24px] mb-16 min-h-[calc(100vh-64px)] bg-gradient-to-r from-[#0E0E33] to-[#39307B] text-white`}
    >
      {search === "search" ? <HeaderPages text={t("Search")} linkRouter="/myTeam" /> : <Navbar text={t("My Team")} />}

      <div className={`${search === "search" ? "px-6" : "flex  items-center justify-between"}`}>
        <Link href={"/myTeam?type=search"} className={`relative ${search === "search" ? "w-full" : "w-2/6"}`} onClick={buttomHandleSearch}>
          <input
            className={`pr-2 pl-8 py-3 rounded-[10px] bg-[#ffffff14] text-white text-[10px] font-bold focus:outline-none w-full `}
            type="text"
            placeholder={`${t("Search")}...`}
            onChange={(e) => filterByInput(e.target.value)}
            value={searchInput}
          />
          <Image src={SearchIcon} alt="search" width={18} height={18} className="absolute top-1/2 left-2 -translate-y-1/2" />
        </Link>

        {search === "search" ? null : (
          <>
            <div className="w-2/6 mx-2 rounded-[8px] border border-solid border-[#554D77] p-1 text-center">
              <p className="mb-[2px] text-[8px] ">
                {t("season").toLocaleUpperCase()} <b>{currentSeason ? currentSeason : selectedOptionSeason}</b>
              </p>
              <Countdown
                nowDate={season?.now || null}
                endDate={season?.end || new Date()}
                bgColor="#554D77"
                classDate="text-[8px] font-bold"
                classname="flex justify-center items-center rounded-[6px] bg-[#554D77] px-[2px]"
              />
            </div>

            <SelectSeason
              selectedOptionSeason={selectedOptionSeason}
              setSelectedOptionSeason={setSelectedOptionSeason}
              optionsSeason={seasonOptions}
            />
          </>
        )}
      </div>

      {search === "search" ? (
        <div className="px-6 mt-8">
          {dataFiltered.map((item) => (
            <CardDetailsHz key={item.id} infoUsers={item} />
          ))}
        </div>
      ) : (
        <div>
          <div className="my-4">
            <div className="flex items-center justify-center">
              <div
                className={`cursor-pointer bg-gradient-to-b rounded-full p-2 ${
                  seeMoreButtonHome ? "from-[#AD98FF] to-[#612DFE]" : "from-[#A9AEB4] to-[#A9AEB4]"
                }`}
                onClick={() => onClickButtonUp()}
              >
                <Image src={ArrowUp} alt="Arrow Up" width={18} height={18} />
              </div>
            </div>
            <div className="flex space-x-6 items-center justify-center mt-4">
              <div
                className={`cursor-pointer bg-gradient-to-b rounded-full p-2 ${
                  seeMoreButtonLeft ? "from-[#AD98FF] to-[#612DFE]" : "from-[#A9AEB4] to-[#A9AEB4]"
                }`}
                onClick={() => onClickButtonLeft()}
              >
                <Image src={ArrowLeft} alt="Arrow Left" width={18} height={18} />
              </div>
              <div
                className={`cursor-pointer bg-gradient-to-b rounded-full p-2 ${
                  seeMoreButtonHome ? "from-[#AD98FF] to-[#612DFE]" : "from-[#A9AEB4] to-[#A9AEB4]"
                }`}
                onClick={() => onClickButtonHome()}
              >
                <Image src={House} alt="Home" width={18} height={18} />
              </div>
              <div
                className={`cursor-pointer bg-gradient-to-b rounded-full p-2 ${
                  seeMoreButtonRight ? "from-[#AD98FF] to-[#612DFE]" : "from-[#A9AEB4] to-[#A9AEB4]"
                }`}
                onClick={() => onClickButtonRight()}
              >
                <Image src={ArrowRight} alt="Arrow Right" width={18} height={18} />
              </div>
            </div>
          </div>
          {usersReferral && (
            <>
              <div className="mt-2">
                {/* // pendiente: Este es el padre */}
                <ReferrerParent user={usersReferral} onClickButtonUserCard={onClickButtonUserCard} />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {Array(2)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <PrimaryReferrals
                        key={index}
                        user={usersReferral.referrals[index]}
                        router={router}
                        position={index === 0 ? "left" : "right"}
                        onClickButtonUserCard={onClickButtonUserCard}
                      />
                    );
                  })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTeam;

function ReferrerParent({ user, onClickButtonUserCard }: { user: UsersReferral; onClickButtonUserCard: (NFTId: number) => void }) {
  const t = useTranslations();
  const router = useRouter();

  const [isModalOpenCopyWallet, setIsModalOpenCopyWallet] = useState<boolean>(false);

  const copyWallet = (wallet: string) => {
    navigator.clipboard.writeText(wallet);
    setIsModalOpenCopyWallet(true);

    setTimeout(() => {
      setIsModalOpenCopyWallet(false);
    }, 2000);
  };

  const buttonSeeMoreCard = (infoUser) => {
    router.push(`/myTeam/nft-details`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-[#ffffff14] w-full rounded-[10px]" onClick={() => onClickButtonUserCard(user.NFTId)}>
        <div className="rounded-t-[10px] relative h-[20px] w-full" style={{ backgroundColor: getRankingAccountColor(user.lvlAccount) }}>
          <div className="w-[32px] h-[32px] absolute -top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
            <Image src={user.image || image1} alt="Imagen NFT" className=" w-full h-full rounded-[16px] object-cover" width={32} height={32} />
          </div>
          {/* <div
            className={`rounded-[10px] w-12 h-12 overflow-hidden absolute 
              ${
                user.position === "left"
                  ? "top-0 right-0 rotate-90"
                  : user.position === "right" ? "top-0 left-0 rotate-0": "hidden"
              }
            `}
          >
            <TrianguloSVG fill={getTypeAccountColor("cuenta de traspaso")} />
          </div> */}
        </div>

        <div className="pt-6 px-[10px] pb-2 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between text-white">
            <p className="text-[8px] font-bold py-[2px] px-1 rounded-[20px] bg-[#ffffff1a]">{user.nftName}</p>
          </div>
          <p className="text-[#A9AEB4] text-[8px] mt-1">{user.plan}</p>
          <p className="text-white text-[8px] font-bold mt-1">${formatCurrencyInteger(Number(user.amountStake))}</p>
          <div className="flex w-full my-2">
            <div className="w-[25%] space-y-1 text-[8px] text-white">
              <p className="text-center font-bold" style={{ backgroundColor: "#35bca5" }}>
                {t("Left").toUpperCase()}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#A9AEB4]">
                  <Image src={DirectVolSVG} alt="GlobalVolSVG" />
                </span>
                <p className="font-bold">{user.numberOfReferralsL}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="">MV</p>
                <p className="font-bold">${formatCurrencyInteger(user.MVL)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="">PV</p>
                <p className="font-bold">${formatCurrencyInteger(user.PVL)}</p>
              </div>
            </div>
            <div className="w-[50%] text-[8px] text-white flex-col flex items-center justify-start">
              <p className=" font-bold">{user.level || t("Me")}</p>
              <div className="flex items-center justify-between space-x-2 my-[2px]">
                <p className="">{t("NFT ID")}</p>
                <p className=" font-bold">{user.NFTId}</p>
              </div>
              <p className="text-[#A9AEB4]" onClick={() => copyWallet(user.wallet)}>
                {cutAddress(user.wallet)}
              </p>
            </div>
            <div className="w-[25%] space-y-1 text-[8px] text-white">
              <p className="text-center font-bold" style={{ backgroundColor: "#04ae4b" }}>
                {t("Right").toUpperCase()}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#A9AEB4]">
                  <Image src={DirectVolSVG} alt="GlobalVolSVG" />
                </span>
                <p className="font-bold">{user.numberOfReferralsR}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="">MV</p>
                <p className="font-bold">${formatCurrencyInteger(user.MVR)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="">PV</p>
                <p className="font-bold">${formatCurrencyInteger(user.PVR)}</p>
              </div>
            </div>
          </div>
          <div className="w-[120px]">
            <Countdown
              nowDate={user.date === 0 ? null : new Date(user.now)}
              endDate={user.date === 0 ? new Date() : new Date(user.date)}
              bgColor="#554D77"
              classDate="text-[10px] font-bold"
              classname="flex justify-center items-center py-[2px] rounded-[6px] bg-[#554D77] w-full mx-auto space-x-4"
            />
            <button
              onClick={() => buttonSeeMoreCard(user)}
              className="text-[8px] bgGradientPurpleMedium font-bold hover:bg-[#7a2ff4] text-white rounded-[6px] w-full py-1 px-2 mt-2"
            >
              {t("See More")}
            </button>
          </div>
        </div>
      </div>
      <div className={`border border-solid border-neutral-400 h-[9px] w-[1px] mx-auto ${true ? "" : "hidden"}`}></div>
      <div className={`border border-solid border-neutral-400 w-[50%] h-[9px] border-b-0 ${true ? "" : "hidden"}`}></div>
      <ModalComponent isOpen={isModalOpenCopyWallet} setIsOpen={setIsModalOpenCopyWallet} classBody="bg-white w-[285px] rounded-xl">
        <div className="container-modal">
          <div className="p-6">
            <p className="text-[16px] text-[#554D77] text-center">{t("You successfully copied the wallet")} </p>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
}

// pendiente: estos son los dos hijos
function PrimaryReferrals({
  user,
  router,
  position,
  onClickButtonUserCard,
}: {
  user?: UsersReferral;
  router: AppRouterInstance;
  position: "left" | "right";
  onClickButtonUserCard: (NFTId: number) => void;
}) {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const buttonSeeMoreCard = (infoUser) => {
    router.push(`/myTeam/nft-details`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center text-[8px] text-white">
        <div className="bg-[#ffffff14] w-full rounded-[10px]" onClick={() => (user?.NFTId !== null && user?.NFTId !== undefined) && onClickButtonUserCard(user.NFTId)}>
          <div className="rounded-t-[10px] relative h-[20px] w-full" style={user ? { backgroundColor: getRankingAccountColor(user.lvlAccount) } : {}}>
            <div className="w-[32px] h-[32px] absolute -top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
              {user ? (
                <Image src={user.image || image1} alt="Imagen NFT" className=" w-full h-full rounded-[16px] object-cover" width={32} height={32} />
              ) : (
                <div className="bg-gradient-to-r from-[#AAB1B9] to-[#78808B] rounded-[100px] p-2 w-[32px] h-[32px] absolute -top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
                  <Image src={EmptyCard} alt="Imagen Empty" className="w-full h-full" width={24} height={24} />
                </div>
              )}
            </div>
            <div
              className={`rounded-[10px] w-12 h-12 overflow-hidden absolute 
              ${position === "right" ? "top-0 right-0 rotate-90" : position === "left" ? "top-0 left-0 rotate-0" : "hidden"}
              
              `}
            >
              <TrianguloSVG fill={position === "right" ? "#04ae4b" : "#35bca5"} width={20} height={20} />
            </div>
          </div>

          <div className="pt-6 px-[6px] pb-[6px] flex flex-col items-center justify-center">
            {user ? (
              <>
                <p className="font-bold py-[2px] my-[2px] px-1 rounded-[20px] bg-[#ffffff1a]">{user.nftName}</p>
                <p className="">{user.plan}</p>

                <div className="flex w-full my-[6px]">
                  <div className="w-[50%] flex items-center justify-center">
                    <span className="text-[#A9AEB4]">
                      <Image src={DirectVolSVG} alt="GlobalVolSVG" />
                    </span>
                    <span className="bg-[#35bca5] ml-1 rounded-full p-1 w-[15px] h-[15px] flex justify-center items-center">
                      {user.numberOfReferralsL}
                    </span>
                  </div>

                  <div className="w-[50%] flex items-center justify-center">
                    <span className="text-[#A9AEB4]">
                      <Image src={DirectVolSVG} alt="GlobalVolSVG" />
                    </span>
                    <span className="bg-[#04ae4b] ml-1 rounded-full p-1 w-[15px] h-[15px] flex justify-center items-center">
                      {user.numberOfReferralsR}
                    </span>
                  </div>
                </div>
                <p className="font-bold mb-[6px]">${user.amountStake}</p>
                <div className="w-[120px]">
                  <Countdown
                    nowDate={user.date === 0 ? null : new Date(user.now)}
                    endDate={user.date === 0 ? new Date() : new Date(user.date)}
                    bgColor="#554D77"
                    classDate="text-[10px] font-bold"
                    classname="flex justify-center items-center py-[2px] rounded-[6px] bg-[#554D77] w-full mx-auto space-x-4"
                  />
                  <button
                    onClick={() => buttonSeeMoreCard(user)}
                    className="text-[8px] bgGradientPurpleMedium font-bold hover:bg-[#7a2ff4] text-white rounded-[6px] w-full py-1 px-2 mt-2"
                  >
                    {t("See More")}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="font-bold">{t("Empty")}</p>
                <div className="w-[120px] mt-[77px]">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[8px] bgGradientPurpleMedium font-bold hover:bg-[#7a2ff4] text-white rounded-[6px] w-full py-1 px-2 mt-2"
                  >
                    {t("New NFT")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={`border border-solid border-neutral-400 h-[9px] w-[1px] mx-auto ${true ? "" : "hidden"}`}></div>
        <div className={`border border-solid border-neutral-400 w-[50%] h-[9px] border-b-0 ${true ? "" : "hidden"}`}></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-full">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <SecondaryReferrals
                key={index}
                user={user?.referrals[index]}
                userParent={user}
                position={index === 0 ? "left" : "right"}
                parentPosition={position}
                onClickButtonUserCard={onClickButtonUserCard}
              />
            ))}
        </div>
      </div>
      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[285px] rounded-xl">
        <div className="container-modal">
          <div className="cursor-pointer w-6 absolute top-1 right-1" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>

          <div className="p-6">
            <p className="text-[16px] text-[#1E0E39] text-center mb-6">{t("How would you like to occupy this NFT account")}?</p>
            <div>
              <ButtonPrimary disabled text={t("Add New Own Account")} onClickFn={() => router.push("/myTeam/new-own-account")} classname="mb-4" />
              <ButtonPrimary disabled text={t("Add New Partner")} onClickFn={() => router.push("/myTeam/new-partner")} />
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}

// pendiente: Estos son los nietos
function SecondaryReferrals({
  user,
  userParent,
  position,
  parentPosition,
  onClickButtonUserCard,
}: {
  user?: UsersReferral;
  userParent?: UsersReferral;
  position: "left" | "right";
  parentPosition: "left" | "right";
  onClickButtonUserCard: (NFTId: number) => void;
}) {
  const t = useTranslations();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center text-[8px]">
      <div className="bg-[#ffffff14] w-full rounded-[10px]" onClick={() => (user?.NFTId !== null && user?.NFTId !== undefined) && onClickButtonUserCard(user.NFTId)}>
        <div
          className="rounded-t-[10px] relative h-[20px] w-full"
          style={{ backgroundColor: user && userParent ? getRankingAccountColor(userParent.lvlAccount) : "transparent" }}
        >
          {user ? (
            <div className="w-[32px] h-[32px] absolute -top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
              <Image src={user.image || image1} alt="Imagen NFT" className=" w-full h-full rounded-[16px] object-cover" width={32} height={32} />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#AAB1B9] to-[#78808B] rounded-[100px] p-2 w-[32px] h-[32px] absolute -top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
              <Image src={EmptyCard} alt="Imagen Empty" className="w-full h-full" width={24} height={24} />
            </div>
          )}

          <div
            className={`rounded-[10px] w-12 h-12 overflow-hidden absolute 
             ${parentPosition === "right" ? "top-0 right-0 rotate-90" : parentPosition === "left" ? "top-0 left-0 rotate-0" : "hidden"}
            `}
          >
            <TrianguloSVG fill={parentPosition === "right" ? "#04ae4b" : "#35bca5"} width={20} height={20} />
          </div>
        </div>

        <div className="pt-6 pb-1 px-1 text-[8px] font-bold text-white  flex flex-col items-center justify-center">
          {user ? (
            <div className="px-3 flex flex-col items-center justify-center">
              <p className="">{user.nftName}</p>
              <p className="my-[2px]">${user.amountStake}</p>
              <p className="">{user.NFTId}</p>
            </div>
          ) : (
            <div className="w-full text-center">
              <p className="">{t("Empty")}</p>
              {userParent && parentPosition === position ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-[8px] bgGradientPurpleMedium font-bold hover:bg-[#7a2ff4] text-white rounded-[6px] w-full py-1 px-2 mt-2"
                >
                  {t("New NFT")}
                </button>
              ) : (
                <div className="h-6" />
              )}
            </div>
          )}
        </div>
      </div>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[285px] rounded-xl">
        <div className="container-modal">
          <div className="cursor-pointer w-6 absolute top-1 right-1" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>

          <div className="p-6">
            <p className="text-[16px] text-[#1E0E39] text-center mb-6">{t("How would you like to occupy this NFT account")}?</p>
            <div>
              <ButtonPrimary disabled text={t("Add New Own Account")} onClickFn={() => router.push("/myTeam/new-own-account")} classname="mb-4" />
              <ButtonPrimary disabled text={t("Add New Partner")} onClickFn={() => router.push("/myTeam/new-partner")} />
            </div>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
}
