"use client";

import { useReadContract } from "thirdweb/react";
import { nftContract } from "../contracts/nft.contract";

export function useGetReferral(referralId: number): {
  referralNumber: number;
  referralName: string;
  isLoadingGettingReferral: boolean;
} {

  referralId = Number.isNaN(referralId) ? 0 : referralId;

  const { data, isLoading } = useReadContract({
    contract: nftContract,
    method: "accountInfo",
    params: [BigInt(referralId)],
  });

  let referralName = "";

  if (data?.[1]) {
    referralName = data?.[1].toString();
  }

  return {
    referralNumber: referralId,
    referralName,
    isLoadingGettingReferral: isLoading,
  }
}