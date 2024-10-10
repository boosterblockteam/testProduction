import { polygon } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { client } from "../client";
import { poiAbi } from "../abis/poiAbi";

export const poiContract = getContract({
  client,
  chain: polygon,
  address: process.env.POI_CONTRACT!,
  abi: poiAbi,
})
