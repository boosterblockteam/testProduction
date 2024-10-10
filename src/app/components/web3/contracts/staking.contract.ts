import { polygon } from "thirdweb/chains";
import { client } from "../client";
import { getContract } from "thirdweb";
import { stakingAbi } from "../abis/stakingAbi";

export const stakingContract = getContract({
  client,
  chain: polygon,
  address: process.env.STAKING_CONTRACT!,
  abi: stakingAbi,
})
