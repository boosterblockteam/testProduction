import { prepareContractCall, sendTransaction } from "thirdweb";
import { nftContract } from "../contracts/nft.contract";
import { useUser } from "../context/UserProvider";
import { useTranslations } from "next-intl";
import { useActiveAccount } from "thirdweb/react";
import { waitForTransactionHash } from "../utils/waitForTransactionHash";
import { membershipContract } from "../contracts/membership.contract";

export type ClaimError = {
  message: string
}

export function useClaim(): {
  claimBonusNft: () => Promise<{
    errors: ClaimError | null
  }>;
  claimDirectBonus: () => Promise<{
    errors: ClaimError | null
  }>;
} {

  const t = useTranslations();

  const { user } = useUser();

  const account = useActiveAccount();

  async function claimBonusNft(): Promise<{
    errors: ClaimError | null
  }> {

    if (!account || !user?.selectedAccount) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    try {

      const transaction = prepareContractCall({
        contract: nftContract,
        method: "claimNftReward",
        params: [BigInt(user.selectedAccount.idAccount)], //ID DE CUENTA
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      })

      const hasTransactionError = await waitForTransactionHash(transactionHash)

      if (hasTransactionError) {
        return {
          errors: {
            message: "Error to claim the NFT"
          }
        }
      }

      return {
        errors: null
      }
      
    } catch (error) {
      console.log(error);

      return {
        errors: {
          message: "Something went wrong"
        }
      }
    }
  }

  async function claimDirectBonus(): Promise<{
    errors: ClaimError | null
  }> {

    if (!account || !user?.selectedAccount) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    try {

      const transaction = prepareContractCall({
        contract: membershipContract,
        method: "claimMembershipReward",
        params: [BigInt(user.selectedAccount.idAccount)], //ID DE CUENTA
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      })

      const hasTransactionError = await waitForTransactionHash(transactionHash)

      if (hasTransactionError) {
        return {
          errors: {
            message: "Error to claim the Direct Bonus"
          }
        }
      }

      return {
        errors: null
      }
      
    } catch (error) {
      console.log(error);

      return {
        errors: {
          message: "Something went wrong"
        }
      }
    }
  }

  return {
    claimBonusNft,
    claimDirectBonus,
  }
}