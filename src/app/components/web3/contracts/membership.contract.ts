import { getContract } from "thirdweb";
import { client } from "../client";
import { polygon } from "thirdweb/chains";
import { membershipAbi } from "../abis/membershipAbi";

export const membershipContract = getContract({
  client,
  chain: polygon,
  address: process.env.MEMBERS_CONTRACT!,
  abi: membershipAbi,
})