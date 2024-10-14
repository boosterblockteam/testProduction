import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { poiContract } from "../../contracts/poi.contract";
import { encryptHex } from "../../utils/crypt";
import { CreatePoiValidationError, useValidatePoi } from "../validations/useValidatePoi";
import { useTranslations } from "next-intl";
import { waitForTransactionHash } from "../../utils/waitForTransactionHash";
import { CreatePoi } from "../../types/poi";

export function usePoi(): {
  createPoi: (params: CreatePoi) => Promise<{
    errors: CreatePoiValidationError | null,
  }>;
} {

  const t = useTranslations();

  const account = useActiveAccount();

  const { validatePoi } = useValidatePoi();

  async function createPoi({
    email,
    fullName,
    username,
    phone,
  }: CreatePoi): Promise<{
    errors: CreatePoiValidationError | null,
  }> {

    try {

      console.log({email, fullName, username, phone})
      
      const encryptedEmail = encryptHex(email)
      const encryptedFullName = encryptHex(fullName)
      const encryptedUsername = encryptHex(username)
      const encryptedPhoneNumber = encryptHex(phone)

      console.log({encryptedEmail, encryptedFullName, encryptedUsername, encryptedPhoneNumber})
    
      // Validation
      const errors = await validatePoi({
        email,
        fullName,
        username,
        phone,
      })

      if (errors) {
        return {
          errors
        }
      }

      const transaction = prepareContractCall({
        contract: poiContract, 
        method: "newUser",
        params: [encryptedEmail, encryptedFullName, encryptedUsername, encryptedPhoneNumber],
        gasPrice: BigInt(150000000000),
      });
    
      console.log({transaction})

      if (!account) {
        return {
          errors: {
            message: t("Please connect your wallet")
          }
        }
      }

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });
  
      console.log({transactionHash});
      // guardar en la base de datos

      const createPoiError = await waitForTransactionHash(transactionHash); 

      if (createPoiError) {
        return {
          errors: {
            message: "Error to create the proof of identity"
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
    createPoi,
  }
}
