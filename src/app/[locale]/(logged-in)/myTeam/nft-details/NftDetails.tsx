"use client";
import React, { use, useState } from "react";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useTranslations } from "next-intl";
import SelectSeason from "../components/SelectSeason";
import Image from "next/image";
import image1 from "@/assets/imgs/watch_gray.png";
import { usePathname, useRouter } from "next/navigation";
import ModalComponent from "@/app/components/generals/ModalComponent";

interface Data {
  title: string;
  data: { title: string; value: string }[];
}

const NftDetails = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpenCopyWallet, setIsModalOpenCopyWallet] = useState<boolean>(false);
  const optionsSeason = [t("All"), "110", "109", "108", "107", "106", "105", "104", "103", "102", "101", "100", "99", "98"];

  const [selectedOptionSeason, setSelectedOptionSeason] = useState<string>(optionsSeason[1]);

  const volumenes: Data = {
    title: t("Volumes"),
    data: [
      {
        title: `${t("DIRECT")} MV`,
        value: "$0",
      },
      {
        title: `${t("DIRECT")} PV`,
        value: "$0",
      },
      {
        title: `${t("TOTAL")} DV`,
        value: "$0",
      },
      {
        title: `${t("Left").toLocaleUpperCase()} RV`,
        value: "$0",
      },
      {
        title: `${t("Right").toLocaleUpperCase()} RV`,
        value: "$0",
      },
      {
        title: `${t("TOTAL")} BV`,
        value: "$0",
      },
    ],
  };

  const currentSeason: Data = {
    title: t("Current Season"),
    data: [
      {
        title: `${t("Left")} MV`,
        value: "$0",
      },
      {
        title: `${t("Right")} MV`,
        value: "$0",
      },
      {
        title: `${t("Season")} MV`,
        value: "$0",
      },
      {
        title: `${t("Left")} PV`,
        value: "$0",
      },
      {
        title: `${t("Right")} PV`,
        value: "$0",
      },
      {
        title: `${t("TOTAL")} PV`,
        value: "$0",
      },
    ],
  };

  const payments: Data = {
    title: t("Payments"),
    data: [
      {
        title: t("NFT Bonus"),
        value: "$100",
      },
      {
        title: t("Staking Profit"),
        value: "$100",
      },
      {
        title: t("Direct Bonus"),
        value: "$100",
      },
      {
        title: t("Direct Rewards"),
        value: "$100",
      },
      {
        title: t("Binary Bonus"),
        value: "$100",
      },
      {
        title: t("Binary Rewards"),
        value: "$100",
      },
    ],
  };

  const propswithOutTitle: Data = {
    title: "",
    data: [
      {
        title: t("Membership"),
        value: "$200",
      },
      {
        title: t("Stake"),
        value: "$1,000",
      },
      {
        title: `${t("Season")} ${t("Profit")}`,
        value: "$200",
      },
      {
        title: t("Performance Fee"),
        value: "$200",
      },
    ],
  };

  const card1: Data = {
    title: "",
    data: [
      {
        title: t("NFT CID"),
        value: "2",
      },
      {
        title: t("NFT Name"),
        value: "DeFilyMaster",
      },
    ],
  };

  const card2: Data = {
    title: "",
    data: [
      {
        title: t("SPONSOR NFT"),
        value: "0",
      },
      {
        title: t("Direct Users"),
        value: "4",
      },
      {
        title: t("Leg Side"),
        value: "RIGHT",
      },
    ],
  };

  const card3: Data = {
    title: "",
    data: [
      {
        title: t("Current Rank"),
        value: "RUBY",
      },
    ],
  };

  const copyWallet = (wallet: string) => {
    navigator.clipboard.writeText(wallet);
    setIsModalOpenCopyWallet(true);

    setTimeout(() => {
      setIsModalOpenCopyWallet(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen pb-[64px] ">
      <div className="flex flex-col justify-between">
        <HeaderPages text={t("NFT Details")} linkRouter="/myTeam" />
        <div className="px-6 text-[10px] h-[calc(100vh-145px)] flex flex-col justify-between">
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <Image src={image1} alt="StartsImg" width={36} height={36} />
              <div className="ml-2">
                <span className="text-white text-[8px] border border-solid border-white rounded-[4px] px-[6px] py-[1px] mr-1"> 4 </span>
                <span className="font-bold text-white text-[10px]">@jobs</span>
                <p className="text-[#A9AEB4] text-[10px] mt-2 cursor-pointer" onClick={() => copyWallet("0x2k3...d89sf")}>
                  0x2k3...d89sf
                </p>
              </div>
            </div>
            <SelectSeason
              selectedOptionSeason={selectedOptionSeason}
              setSelectedOptionSeason={setSelectedOptionSeason}
              optionsSeason={optionsSeason}
            />
          </div>

          <div className="space-y-1 text-white">
            <div className={`grid grid-cols-${2} gap-1`}>
              {card1.data.map(({ title, value }) => (
                <div key={title} className="bg-[#ffffff40] py-1 px-2 rounded-[6px] text-center text-[10px] ">
                  <div className="mb-[2px]">{title.toLocaleUpperCase()}</div>
                  <div className="font-bold">{value}</div>
                </div>
              ))}
            </div>
            <div className={`grid grid-cols-${3} gap-1`}>
              {card2.data.map(({ title, value }) => (
                <div
                  key={title}
                  className={`${title === t("Direct Users") ? "bg-[#7A2FF4]" : "bg-[#ffffff40]"} p-1 rounded-[6px] text-center text-[10px]`}
                  onClick={() => (title === t("Direct Users") ? router.push("/myTeam/direct-users") : null)}
                >
                  <div className=" mb-[2px]">{title.toLocaleUpperCase()}</div>
                  <div className="font-bold">{value}</div>
                </div>
              ))}
            </div>
            <div className={`grid grid-cols-${1} gap-1`}>
              {card3.data.map(({ title, value }) => (
                <div key={title} className="bg-[#9B111E] p-[6px] rounded-[6px] flex items-center justify-center space-x-4 text-[10px]">
                  <div className="">{title.toLocaleUpperCase()}</div>
                  <div className="font-bold ">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`grid grid-cols-${2} gap-1`}>
            {propswithOutTitle.data.map(({ title, value }) => (
              <div key={title} className="bg-[#DFE4EF] text-[#554D77] text-[10px] p-[6px] rounded-[6px] flex items-center justify-between">
                <span className="">{title.toLocaleUpperCase()}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>

          <CardContainer data={currentSeason} numberGrid={3} />
          <CardContainer data={volumenes} numberGrid={3} />
          <CardContainer data={payments} numberGrid={2} />
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

export default NftDetails;

function CardContainer({ data, numberGrid }: { data: Data; numberGrid: number }) {
  const t = useTranslations();

  return (
    <div
      className={`rounded-[10px] p-1 mb-0 last:mb-6 text-white border border-solid ${
        data.title === t("Volumes") ? "border-[#ffffff40]" : data.title === t("Payments") ? "border-[#20DABB]" : "border-[#7A2FF4]"
      } `}
    >
      <div className="text-center font-bold mb-1 text-[12px]">
        {data.title} {data.title === t("Current Season") ? "110" : null}
      </div>
      <div className={`grid grid-cols-${numberGrid} gap-1`}>
        {data.data.map(({ title, value }) => (
          <div key={title} className="bg-[#ffffff40] text-[10px] p-1 rounded-[6px] text-center">
            <div className="mb-[2px]">{title.toLocaleUpperCase()}</div>
            <div className="font-bold text-[1em]">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
