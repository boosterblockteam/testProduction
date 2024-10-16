"use client";
import React, { useEffect, useState } from "react";
import WalletBalance from "./components/WalletBalance";
import Navbar from "@/app/components/generals/Navbar";
import { useTranslations } from "next-intl";
import CardsSwiper from "./components/CardsSwiper";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/components/web3/context/UserProvider";
import { readContract } from "thirdweb";
import { nftContract } from "../../../components/web3/contracts/nft.contract";
import { membershipContract } from "@/app/components/web3/contracts/membership.contract";

const MyNfts = ({ dataInfoUserNfts }) => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useUser();

  const [infoNfts, setInfoNfts] = useState<any>([]);

  const buttonCreateNewNFT = () => {
    router.push("/my-nfts/buy-nft");
  };

  const getSponsorName = async (id: any) => {
    if (!user.selectedAccount?.idAccount) {
      return;
    }
    const rewardsNFTs = await readContract({
      contract: nftContract,
      method: "accountInfo",
      params: [id], //ID DE CUENTA
    });

    return rewardsNFTs[1];
  };
  const getMembershipsOfUser = async (id: any) => {
    if (!user.selectedAccount?.idAccount) {
      return;
    }
    const membershipOfUsers = await readContract({
      contract: membershipContract,
      method: "membershipOfUsers",
      params: [BigInt(user.selectedAccount.idAccount), BigInt(0)], //EN VES DE 12 DEBERIA IR EL ID DEL NFT
    });
    console.log(membershipOfUsers);

    return membershipOfUsers.length;
  };

  useEffect(() => {
    console.log(user);

    const fetchData = async () => {
      let infoNft: any = [];

      if (user.accounts) {
        // Utiliza Promise.all para manejar múltiples solicitudes asíncronas
        const promises = user.accounts.map(async (account) => {
          const sponsorName = await getSponsorName(account.sponsor);
          const membresshipZero = await getMembershipsOfUser(account.sponsor);
          const baseURL = process.env.APP_URL;
          const referralLink = `${baseURL}/?sponsor=${account.idAccount || 0}&legside=${user.selectedAccount?.legSide || "a"}`;
          console.log({ accounts: user.accounts });
          return {
            // imageNft: `ipfs://${account.cid}/${account.idAccount}.png`, //account.image,
            imageNft: account.image,
            nameAccount: account.accountName,
            levelCurrent: "BASE",
            sponsorNFTId: account.sponsor,
            sponsorNFTName: sponsorName || "Unknown", // Espera el resultado de la promesa
            referralLink: referralLink,
            address: user.address,
            idAccount: account.idAccount,
          };
        });

        // Resuelve todas las promesas y actualiza el estado
        const resolvedInfoNft = await Promise.all(promises);
        console.log(resolvedInfoNft);
        setInfoNfts(resolvedInfoNft);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] flex flex-col justify-between min-h-screen pt-6 pb-[88px] px-6">
      <div>
        <div>
          <Navbar text={t("My NFTs")} />
        </div>
        <WalletBalance />
      </div>

      <div>
        <CardsSwiper dataInfoUserNfts={dataInfoUserNfts} infoNfts={infoNfts} />
      </div>

      <div>
        <ButtonPrimary text={"Create New NFT"} onClickFn={buttonCreateNewNFT} classname="w-full mt-2" />
      </div>
    </div>
  );
};

export default MyNfts;
