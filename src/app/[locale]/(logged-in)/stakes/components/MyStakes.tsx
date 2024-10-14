"use client";
import React, { useEffect, useState } from "react";
import ChartsDonus from "@/app/components/generals/charts/ChartsDonus";
import { useTranslations } from "next-intl";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { ProfitHistoryMyLiquidity, InfoMembership, sortedProfitHistoryMyLiquidity } from "./MockData";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import EachMembreship from "./EachMembership";
import ChartsDonusMyStakes from "@/app/components/generals/charts/ChartsDonusMyStakes";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";
import { client } from "@/app/components/web3/client";
import { stakingContract } from "@/app/components/web3/contracts/staking.contract";
import { membershipContract } from "@/app/components/web3/contracts/membership.contract";
import { readContract } from "thirdweb";
import { getContractEvents } from "thirdweb";
import { prepareEvent } from "thirdweb";
import { ethers } from "ethers";
import { useUser } from "@/app/components/web3/context/UserProvider";
interface Props {
  dataMyStakes: ProfitHistoryMyLiquidity[];
  infoMembership: InfoMembership[];
}

const MyStakes = ({ dataMyStakes = sortedProfitHistoryMyLiquidity, infoMembership }: Props) => {
  const t = useTranslations();
  const [tvl, setTvl] = useState<any>(0);
  const [userStakes, setUserStakes] = useState<any>(0);
  const [infoMemberships, setInfoMemberships] = useState<any[]>([]);
  const [myStakesEvents, setMyStakesEvents] = useState<any[]>([]);
  const account = useActiveAccount();
  useAutoConnect({
    client,
    onConnect: console.log,
  });

  const { user } = useUser();

  const numberByPage = 8;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: dataMyStakes,
    numberByPage: numberByPage,
  });

  const getInfo = async () => {
    console.log("INFO");
    console.log(account);
    const myEvent = prepareEvent({
      signature: "event Staked(uint256 indexed nftUse, uint256 amount, uint256 index)",
    });
    const events = await getContractEvents({
      contract: stakingContract,
      fromBlock: BigInt(62588105),
      events: [myEvent],
    });
    console.log(events);

    if (!user?.selectedAccount) {
      return;
    }

    const myNftId = BigInt(user.selectedAccount.idAccount); // Reemplaza por el ID de tu NFT

    const myNftTransactions: any = events.filter((event) => {
      return event.args.nftUse === myNftId;
    });

    for (let i = 0; i < myNftTransactions.length; i++) {
      const myNftTransaction = myNftTransactions[i];
      myNftTransaction.time = await getBlockTimestamp(myNftTransaction.blockNumber);
    }

    console.log(myNftTransactions);
    setMyStakesEvents(myNftTransactions);

    if (!account) {
      return { errors: { message: t("Please connect your wallet") } };
    }

    const tvl = await readContract({
      contract: stakingContract,
      method: "TVL",
      params: [],
    });

    const userStakes = await readContract({
      contract: stakingContract,
      method: "userStakes",
      params: [BigInt(user.selectedAccount.idAccount)], //EN VES DE 12 DEBERIA IR EL ID DEL NFT
    });

    let index = 0;
    let keepIterating = true;
    let membershipsArray: any[] = [];

    while (keepIterating) {
      try {
        const membershipOfUsers = await readContract({
          contract: membershipContract,
          method: "membershipOfUsers",
          params: [BigInt(user.selectedAccount.idAccount), BigInt(index)], //EN VES DE 12 DEBERIA IR EL ID DEL NFT
        });
        const memberships = await readContract({
          contract: membershipContract,
          method: "memberships",
          params: [membershipOfUsers[0]],
        });

        console.log(`INFORMACION en index ${index}:`, membershipOfUsers);
        console.log(`INFORMACION Membresia ${index}:`, memberships);

        membershipsArray.push({
          id: index,
          plan: memberships[0],
          type: "Stake", // Asegúrate de pasar el tipo correcto si lo tienes disponible
          amount: Number(membershipOfUsers[3]) / 1000000,
          share: tvl > 0 ? (Number(membershipOfUsers[3]) / Number(tvl) * 100).toFixed(2) : 0,
          myProfit: 0, // Ajusta esto según el cálculo de ganancias que tengas
        });

        index++;
      } catch (error) {
        console.log(`Error en el index ${index}, finalizando iteración`, error);
        keepIterating = false;
      }
    }

    console.log(membershipsArray);

    setTvl(Number(tvl) / 1000000);
    setUserStakes(Number(userStakes) / 1000000);
    setInfoMemberships(membershipsArray);
    console.log(userStakes);
    console.log(tvl);
  };

  useEffect(() => {
    getInfo();
  }, [account, user]);
  const myStakePercentage = tvl > 0 ? (userStakes / tvl) * 100 : 0;

  const getBlockTimestamp = async (blockNumber: bigint) => {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
    const block = await provider.getBlock(Number(blockNumber));
    return new Date(block.timestamp * 1000).toLocaleString();
  };

  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col justify-between">
      <div className="container-up mx-6 mt-6">
        <div className="container-purple py-6 px-12 rounded-[20px] shadow-md bg-[#7A2FF4] text-white text-center">
          <p className="text-[14px] mb-2">{t("Total Value Locked")}</p>
          <p className="text-[24px] font-bold">$ {tvl}</p>
        </div>
        <div>
          <ChartsDonusMyStakes myShare={userStakes} tvl={tvl} percentage={myStakePercentage} />
        </div>
        <EachMembreship infoMembership={infoMemberships} />
      </div>
      <div className="container-down px-[24px] pt-[32px] pb-[96px] rounded-t-[40px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
        <div className="text-white ">
          <h1 className="text-[20px] font-bold mb-[16px]">{t("Stake & Un-Stake History")}</h1>
          <div>
            {myStakesEvents.length > 0 ? (
              <>
                <div className="container-info px-4 rounded-[20px] bg-[#ffffff14]">
                  {myStakesEvents.map((event, index) => (
                    <div
                      className="container-info-user flex items-center justify-between py-[16px] border-b border-solid border-[#ffffff14]"
                      key={index}
                    >
                      <div className="container-left">
                        <p className="text-[16px] font-bold text-[#20DABB]">+${Number(event.args.amount) / 1000000}</p>
                      </div>
                      <div className="container-right text-[12px] text-[#A9AEB4]">
                        <span>{event.time}</span>
                        {/* <span>Index: {event.args.index.toString()}</span> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-5 ">
                  <Pagination
                    currentPage={currentPage}
                    goToNextPage={goToNextPage}
                    goToPage={goToPage}
                    goToPreviousPage={goToPreviousPage}
                    totalPages={totalPages}
                  />
                </div>
              </>
            ) : (
              <p className="text-white font-bold text-[18px] text-center">{t("No Stake & Un-Stake History")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStakes;
