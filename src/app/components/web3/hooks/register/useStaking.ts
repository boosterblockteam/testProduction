import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { stakingContract } from "../../contracts/staking.contract";
import { useTranslations } from "next-intl";
import { StakingValidationError, useValidateStaking } from "../validations/useValidateStaking";
import { waitForTransactionHash } from "../../utils/waitForTransactionHash";
import { mainGasPrice } from "../../prices/gas-prices";

export type Staking = {
  amount: number;
  nftUse: number;
  index: number;
}

export function useStaking(): {
  staking: (params: Staking) => Promise<{
    errors: StakingValidationError | null;
  }>;
} {

  const t = useTranslations();

  const account = useActiveAccount();

  const { validateStaking } = useValidateStaking();

  async function staking({
    amount,
    nftUse,
    index,
  }: Staking): Promise<{
    errors: StakingValidationError | null;
  }> {

    if (!account) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }
  
    try {

      const errors = await validateStaking({
        amount,
      })

      if (errors) {
        return {
          errors
        }
      }

      amount = amount * 1000000

      console.log({nftContractAddress: stakingContract.address})
  
      const transaction = prepareContractCall({
        contract: stakingContract, 
        method: "stake", 
        params: [BigInt(amount), BigInt(nftUse), BigInt(index)],
        // params: [BigInt(250000000), BigInt(0), BigInt(0)], // ACA DEBE TOMAR EL TOTAL DESDE EL LOCALSTORAGE, EL NFT NUMBER DESDE EL LOCALSTORAGE Y EL INDEX SIEMRPE DEBE SER 0
        gasPrice: mainGasPrice,
      });

      console.log({transaction})

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });
  
      console.log({transactionHash});
      // guardar en la base de datos

      const stakingError = await waitForTransactionHash(transactionHash); 

      if (stakingError) {
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
    staking,
  }
  
}