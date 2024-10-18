import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { membershipContract } from "../../contracts/membership.contract";
import { useTranslations } from "next-intl";
import { PurchaseMembershipValidationError } from "../validations/useValidatePurchaseMembership";
import { waitForTransactionHash } from "../../utils/waitForTransactionHash";
import { membershipGasPrice } from "../../prices/gas-prices";


export type Membership = {
  id: number;
  nftUse: number;
  minStake: string;
  maxStake: string;
  promoCode: string;
  percentage: number;
  price: number;
}

export function useBuyMembership(): {
  buyMembership: (params: Membership) => Promise<{
    errors: PurchaseMembershipValidationError | null;
  }>;
} {
  const t = useTranslations();

  const account = useActiveAccount();

  async function buyMembership({
    id,
    nftUse,
    promoCode,
  }: Membership): Promise<{
    errors: PurchaseMembershipValidationError | null;
  }> {

    if (!account) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    const transaction = prepareContractCall({ 
      contract: membershipContract, 
      method: "buyMembership",
      params: [
        BigInt(id),
        BigInt(nftUse),
        promoCode,
      ],
      gasPrice: membershipGasPrice,
    });
    
    try {
      console.log({transaction})

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });
  
      console.log({transactionHash});
      // guardar en la base de datos

      const buyMembershipError = await waitForTransactionHash(transactionHash); 

      if (buyMembershipError) {
        return {
          errors: {
            message: "Error to buy the membership"
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
    buyMembership,
  }
}