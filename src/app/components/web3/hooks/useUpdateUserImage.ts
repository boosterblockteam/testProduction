import { useTranslations } from "next-intl";
import { useActiveAccount } from "thirdweb/react";
import { useUser } from "../context/UserProvider";
import { useGetPoi } from "./useGetPoi";
import { encryptHex } from "../utils/crypt";
import { poiContract } from "../contracts/poi.contract";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { waitForTransactionHash } from "../utils/waitForTransactionHash";

export function useUpdateUserImage(): {
  updateUserImage: (imageLink: string) => Promise<{
    errors: { message: string } | null
  }>;
} {

  const t = useTranslations();

  const account = useActiveAccount();
  const { poi } = useGetPoi();
  const { reloadUser } = useUser();

  async function updateUserImage(imageLink: string): Promise<{
    errors: { message: string } | null
  }> {

    try {
      
      if (!poi) {
        return {
          errors: {
            message: "Please connect your wallet"
          }
        }
      }

      const encryptedImageLink = encryptHex(imageLink.trim())
      console.log({encryptedImageLink})

      // const errors = 
      // pendiente: validar url de la imagen
      // if (imageLink) {
      //   const errorImageLinkFormat = validateUrl(imageLink);
      //   if (errorImageLinkFormat) {
      //     errors.imageLink = errorImageLinkFormat;
      //   }
      // }

      const transaction = prepareContractCall({
        contract: poiContract,
        method: "updateImgUser",
        params: [encryptedImageLink],
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

      const updatePoiError = await waitForTransactionHash(transactionHash); 

      if (updatePoiError) {
        return {
          errors: {
            message: "Error to update the POI"
          }
        }
      }

      reloadUser()

      return {
        errors: null
      }

    } catch (error) {
      console.log(error);

      if ("message" in error && "code" in error) {
        if (error.code === 4001) {
          return {
            errors: {
              message: t("You have rejected the transaction from metamask")
            }
          }
        }
      }

      return {
        errors: {
          message: "Something went wrong"
        }
      }
      
    }

  }

  return {
    updateUserImage,
  };
}