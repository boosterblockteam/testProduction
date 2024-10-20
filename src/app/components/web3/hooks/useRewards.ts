import { readContract } from "thirdweb";
import { nftContract } from "../contracts/nft.contract";
import { useTranslations } from "next-intl";
import { useUser } from "../context/UserProvider";
import { useActiveAccount } from "thirdweb/react";
import { useEffect, useState } from "react";
import { membershipContract } from "../contracts/membership.contract";

export function useRewards(): {
  nftProfit: number;
  nftPayedProfit: number;
  memberProfit: number;
  memberPayedProfit: number;
  totalRewards: number;
} {
  const [nftProfit, setNftProfit] = useState(0);
  const [nftPayedProfit, setNftPayedProfit] = useState(0);
  const [memberProfit, setMemberProfit] = useState(0);
  const [memberPayedProfit, setMemberPayedProfit] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);

  const t = useTranslations();

  const { user } = useUser();

  const account = useActiveAccount();

  useEffect(() => {

    const profitInterval = setInterval(async () => {
      const nftProfit = await getNftProfit();
      const nftPayedProfit = await getNftPayedProfit();
      const memberProfit = await getMemberProfit();
      const totalRewards = nftProfit + memberProfit;
      const memberPayedProfit = await getMemberPayedProfit();
      setNftProfit(prevNftProfit => nftProfit);
      setNftPayedProfit(prevNftPayedProfit => nftPayedProfit);
      setMemberProfit(prevMemberProfit => memberProfit);
      setMemberPayedProfit(prevMemberPayedProfit => memberPayedProfit);
      setTotalRewards(prevTotalRewards => totalRewards);
    }, 2000);

    return () => clearInterval(profitInterval);

  }, [account, user]);

  async function getNftProfit(): Promise<number> {

    if (!account || !user?.selectedAccount) {
      return 0;
    }

    const rewardsNFTs = await readContract({ 
      contract: nftContract,
      method: "rewards",
      params: [BigInt(user.selectedAccount.idAccount)], //ID DE CUENTA
    });

    const formattedRewardsNFTs = Number(rewardsNFTs) / 1_000_000;

    return formattedRewardsNFTs
  }
  async function getNftPayedProfit(): Promise<number> {

    if (!account || !user?.selectedAccount) {
      return 0;
    }

    // const rewardsNFTs = await readContract({ 
    //   contract: nftContract,
    //   method: "rewards",
    //   params: [BigInt(user.selectedAccount.idAccount)], //ID DE CUENTA
    // });
    const totalPayedRewards = await readContract({ 
      contract: nftContract,
      method: "totalPayedRewards",
      params: [BigInt(user.selectedAccount.idAccount)], //ID DE CUENTA
    });

    const formattedPayedRewardsNFTs = Number(totalPayedRewards) / 1_000_000;

    return formattedPayedRewardsNFTs
  }

  async function getMemberProfit(): Promise<number> {

    if (!account || !user?.selectedAccount) {
      return 0;
    }
 
    const rewardsMembers = await readContract({ 
      contract: membershipContract,
      method: "rewards",
      params: [BigInt(user.selectedAccount.idAccount)], //ID DE CUENTA
    });

    const formattedRewardsMembers = Number(rewardsMembers) / 1_000_000;

    return formattedRewardsMembers
  }

  async function getMemberPayedProfit(): Promise<number> {
    if (!account || !user?.selectedAccount) {
      return 0;
    }
    const totalPayedRewards = await readContract({ 
      contract: membershipContract,
      method: "totalPayedRewards",
      params: [BigInt(user.selectedAccount.idAccount)], //ID DE CUENTA
    });
    const formattedPayedRewardsNFTs = Number(totalPayedRewards) / 1_000_000;
    return formattedPayedRewardsNFTs
  }

  return {
    nftProfit,
    nftPayedProfit,
    memberProfit,
    memberPayedProfit,
    totalRewards,
  }
}
