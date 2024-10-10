"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "@/assets/imgs/watch_gray.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./accountsSwiperStyles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useActiveAccount, useActiveWallet, useAutoConnect, useDisconnect } from "thirdweb/react";
import { client } from "@/app/components/web3/client";
import { ServiceProvider } from "@/app/components/providers/service.provider";
import { useUser } from "@/app/components/web3/context/UserProvider";
import { Account } from "@/app/[locale]/purchaseNft/types/account";

const Accounts = () => {
  const t = useTranslations();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const { user, reloadUser } = useUser();

  const handleSelectPlan = async (id: number) => {
    if (!user) {
      console.log({user});
      return;
    }

    try {
      const { accountService } = ServiceProvider.getInstance().getServices();
  
      const { account } = await accountService.selectAccount(user.address, id);

      await reloadUser();
      router.push(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonLogout = async () => {
    if (wallet) {
      disconnect(wallet);
    }
    router.push("/welcome");
  };

  const chunkedAccounts = accounts.reduce((resultArray: Account[][], item, index) => {
    const chunkIndex = Math.floor(index / 4);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  const account = useActiveAccount();

  useAutoConnect({
    client,
    onConnect: console.log,
  });

  useEffect(() => {
    if (account != undefined) {
      getProfileHeaderInfo();
    }
  }, [account]);

  const getProfileHeaderInfo = async () => {
    // if (!account) return;
    // let index = 0;
    // let nftNumbers: bigint[] = [];
    // let stopFetching = false;
    // let nftDetails: any[] = [];
    // while (!stopFetching) {
    //   try {
    //     const nftNumber = await readContract({
    //       contract: nftContract,
    //       method: "arrayInfo",
    //       params: [account.address, BigInt(index)],
    //     });
    //     nftNumbers.push(nftNumber);
    //     index++;
    //   } catch (error) {
    //     stopFetching = true;
    //   }
    // }

    // for (let i = 0; i < nftNumbers.length; i++) {
    //   const infoAccount = await readContract({
    //     contract: nftContract,
    //     method: "accountInfo",
    //     params: [nftNumbers[i]],
    //   });
    //   const metadataUrl = `https://amaranth-intelligent-hamster-729.mypinata.cloud/ipfs/QmVn3jRPCnjzhGnm2u5p21jR2F3HJGSsNvefbLVLxLTByy/${nftNumbers[i]}.json`;
    //   try {
    //     const response = await fetch(metadataUrl);
    //     const metadata = await response.json();
    //     nftDetails.push({ name: infoAccount[1], id: nftNumbers[i], image: metadata.image });
    //   } catch (error) {
    //     nftDetails.push({ name: infoAccount[1], id: nftNumbers[i], image: "" });
    //     console.error(`Error fetching metadata for ID ${nftNumbers[i]}:`, error);
    //   }
    // }
    const { accountService } = ServiceProvider.getInstance().getServices();
    const { accounts } = await accountService.getAccounts(user.address);
    setAccounts(accounts);
  };

  return (
    <div className="h-screen bg-gradient-to-t from-[#39307B] to-[#0E0E33] pb-6 flex flex-col justify-between">
      <div className="h-full">
        <div className="container-up-img-account"></div>
        <div className="px-6 pt-6">
          <div className="container-text">
            <h1 className="titleWelcomeLinear">
              {t("Welcome to")} <span>DeFily</span>!
            </h1>
            <span className="text-white text-[14px] mt-[18px]">{t("Please select one of your accounts")}</span>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Pagination, Navigation]}
            className="mySwiper mt-8 h-[355px]"
          >
            {chunkedAccounts.map((chunk, chunkIndex) => (
              <SwiperSlide key={chunkIndex}>
                <div className="grid grid-cols-2 justify-items-center h-[335px] max-w-[360px] mx-auto text-center">
                  {chunk.map((account, index) => (
                    <div
                      className="rounded-[10px] h-[135px] w-[144px] mb-4 cursor-pointer"
                      key={account.idAccount}
                      onClick={() => handleSelectPlan(account.idAccount)}
                    >
                      <div className={`${index % 2 ? "bg-[#70D1F4]" : "bg-[#7573A6]"} rounded-t-[10px] w-full h-[10px]`}></div>
                      <div className="py-1 text-center bg-[#ffffff1a] h-full px-3 flex flex-col items-center justify-center rounded-b-[10px]">
                        <div className="rounded-full border-[4px] border-solid border-[#ffffff1a] w-[60px] h-[60px]">
                          <Image src={account.image || image1} alt={`${account.accountName} logo`} width={60} height={60} className="rounded-full object-cover h-full" />
                        </div>
                        <p className="text-white text-[10px] font-bold rounded-[20px] bg-[#ffffff1a] py-1 px-[10px] mt-4 w-[100px]">{account.accountName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="px-6">
        <ButtonSecondary text={t("Log Out")} onClickFn={buttonLogout} />
      </div>
    </div>
  );
};

export default Accounts;
