import { getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { client } from "../client";
import { erc20Abi } from "../abis/erc20Abi";

export const tokenContract = getContract({
  client,
  chain: polygon,
  address: process.env.TOKEN_CONTRACT!,
  abi: erc20Abi,
})