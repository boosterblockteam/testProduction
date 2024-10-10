import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { nftContract } from "../../contracts/nft.contract";
import { useTranslations } from "next-intl";
import { tokenContract } from "../../contracts/token.contract";
import { BuyNftValidationError, useValidateNft } from "../validations/useValidateNft";
import { waitForTransactionHash } from "../../utils/waitForTransactionHash";

export type Nft = {
  nameAccount: string;
  sponsor: number;
  nftcid: string;
  legSide: number;
  nftNumber: number;
}

export function useBuyNft(): {
  buyNft: (params: Nft) => Promise<{
    errors: BuyNftValidationError | null;
  }>;
} {

  const t = useTranslations();

  const account = useActiveAccount();

  const { validateNft } = useValidateNft();

  async function buyNft({
    nameAccount,
    sponsor,
    nftNumber,
    nftcid, 
    legSide, 
  }: Nft): Promise<{
    errors: BuyNftValidationError | null;
  }> {

    // Validation

    if (!account) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    try {

      const errors = await validateNft({
        nameAccount,
        nftNumber,
      })

      if (errors) {
        return {
          errors
        }
      }

      

      console.log({
        nameAccount,
        address: account.address,
        sponsor,
        nftcid,
        legSide,
        nftNumber,
      })

      // nftcid example: QmXEpRrkBShKwWCTShMzuXoy4h75PWNQhUmVWfgHQECgio
  
      const transaction = prepareContractCall({
        contract: nftContract, 
        method: "createNFT", 
        params: [nameAccount, account.address, BigInt(sponsor), nftcid, BigInt(legSide), BigInt(nftNumber)],  //ANOTNIO: DEBEN SER DATOS DINAMICOS, EL NAME ACCOUNT DEL LOCALSTORAGE, EL USER QUE SEA EL ADDRESS,
        // params: [nameAccount, account.address, BigInt(0), "", BigInt(1), BigInt(0)],  //ANOTNIO: DEBEN SER DATOS DINAMICOS, EL NAME ACCOUNT DEL LOCALSTORAGE, EL USER QUE SEA EL ADDRESS,
                                                                                      //EL SPONSOR DESDE LOCAL IGUAL QUE CID, LEGSIDE Y NFT NUMBER. SPONSOR Y LEGSIDE DEBE TOMARLO DESDE EL CODGIO DE REFERIDOS
      });

            //ANTONIO: CREAR BUCLE DE ESPERAR TRANSACCION

      console.log({transaction})

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });
  
      console.log({transactionHash});

      const purchaseNFTError = await waitForTransactionHash(transactionHash); 

      if (purchaseNFTError) {
        return {
          errors: {
            message: "Error to purchase the NFT"
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
    buyNft,
  }
}