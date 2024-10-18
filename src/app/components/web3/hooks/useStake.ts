import { useTranslations } from "next-intl";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { stakingContract } from "../contracts/staking.contract";
import { tokenContract } from "../contracts/token.contract";
import { waitForTransactionHash } from "../utils/waitForTransactionHash";
import { useUser } from "../context/UserProvider";
import { mainGasPrice } from "../prices/gas-prices";

export type StakeError = {
  message: string;
}

export type Staking = {
  amount: number;
  memberId: number;
}

export function useStake(): {
  approveStaking: (amount: number) => Promise<{
    errors: StakeError | null
  }>;
  stake: (params: Staking) => Promise<{
    errors: StakeError | null
  }>;
} {

  const t = useTranslations();
  const account = useActiveAccount();
  const { user } = useUser();

  async function approveStaking(amount: number): Promise<{
    errors: StakeError | null
  }> {

    if (!account || !user?.selectedAccount) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    try {
      const parsedAmount = amount * 1_000_000;
  
      const approvalToken = prepareContractCall({
        contract: tokenContract, 
        method: "approve", 
        params: [stakingContract.address, BigInt(parsedAmount)],
        gasPrice: mainGasPrice,
      });
  
      const { transactionHash } = await sendTransaction({
        account,
        transaction: approvalToken,
      });
  
      console.log({transactionHash});
  
      const approveError = await waitForTransactionHash(transactionHash);
  
      if (approveError) {
        return {
          errors: {
            message: "Error to approve the token to pay"
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

  async function stake(params: Staking): Promise<{
    errors: StakeError | null
  }> {

    if (!account || !user?.selectedAccount) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    try {
      
      

      const amount = BigInt(params.amount * 1_000_000);

      const nftId = BigInt(user.selectedAccount.idAccount);

      const memberId = BigInt(params.memberId);

      const transaction = prepareContractCall({
        contract: stakingContract, 
        method: "stake", 
        params: [amount, nftId, memberId], //EN VES DE 12 DEBERIA IR EL ID DEL NFT
        gasPrice: mainGasPrice,
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      console.log({transactionHash});

      const stakeError = await waitForTransactionHash(transactionHash);
      
      if (stakeError) {
        return {
          errors: {
            message: "Error to stake the NFT"
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
    approveStaking,
    stake,
  }
}