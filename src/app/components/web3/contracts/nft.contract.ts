import { polygon } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { client } from "../client";
import { accountAbi } from "../abis/accountAbi";

export const nftContract = getContract({
  client,
  chain: polygon,
  address: process.env.ACCOUNT_CONTRACT!,
  abi: accountAbi,
})
