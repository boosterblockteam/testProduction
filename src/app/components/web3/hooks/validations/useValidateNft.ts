import { useTranslations } from "next-intl";
import { nftContract } from "../../contracts/nft.contract";
import { readContract } from "thirdweb";

type BuyNftValidationParams = {
  nameAccount: string;
  nftNumber: number;
}

export type BuyNftValidationError = {
  nameAccount?: string;
  nftNumber?: string;
  message?: string;
}

export function useValidateNft(): {
  validateNft: (params: BuyNftValidationParams) => Promise<BuyNftValidationError | null>;
} {

  const t = useTranslations();

  async function validateNft({
    nameAccount,
    nftNumber,
  }: BuyNftValidationParams): Promise<BuyNftValidationError | null> {

    const errors: BuyNftValidationError = {}

    nameAccount = nameAccount.toLowerCase().replaceAll(" ", "");

    try {
      console.log({nameAccount, nftNumber})

      const owner = await readContract({
        contract: nftContract,
        method: "ownerOf", 
        params: [BigInt(nftNumber)],
      });

      if (owner !== nftContract.address) {
        errors.nameAccount = t(`NFT (${nftNumber}) is already in use, please choose another one`)
      }

      const isUsedNameAccount = await readContract({ 
        contract: nftContract,
        method: "usedName",
        params: [nameAccount],
      });

      console.log({isUsedNameAccount})

      if (isUsedNameAccount) {
        errors.nameAccount = t("This name is already in use, please choose another one")
      }

      if (Object.keys(errors).length > 0) {
        return errors
      }
  
      return null
      
    } catch (error) {
      console.log(error);
  
      return {
        message: "Something went wrong"
      }
    }

  }

  return {
    validateNft,
  }

}