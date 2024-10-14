import { useActiveAccount } from "thirdweb/react";
import { encryptHex } from "../utils/crypt";
import { UpdatePoiValidationError, useValidatePoi } from "./validations/useValidatePoi";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { poiContract } from "../contracts/poi.contract";
import { waitForTransactionHash } from "../utils/waitForTransactionHash";
import { useTranslations } from "next-intl";
import { useUser } from "../context/UserProvider";
import { useGetPoi } from "./useGetPoi";

export type UpdatePoiValidationParams = {
  email?: string;
  fullName?: string;
  phone?: string;
  country?: string;
  gender?: string;
  dateOfBirth?: string;
  fbLink?: string;
  igLink?: string;
  youtubeLink?: string;
  yTWelcomeLink?: string;
  tikTokLink?: string;
  wspLink?: string;
  bio?: string;
}

export function useUpdatePoi(): {
  updatePoi: (params: UpdatePoiValidationParams) => Promise<{
    errors: UpdatePoiValidationError | null;
  }>;
} {

  const t = useTranslations();

  const account = useActiveAccount();

  const { poi } = useGetPoi();
  const { validateUpdatePoi } = useValidatePoi();
  const { reloadUser } = useUser();

  async function updatePoi(params: UpdatePoiValidationParams): Promise<{
    errors: UpdatePoiValidationError | null;
  }> {

    try {

      const {
        email,
        fullName,
        phone,
        country,
        gender,
        dateOfBirth,
        fbLink,
        igLink,
        youtubeLink,
        yTWelcomeLink,
        tikTokLink,
        wspLink,
        bio,
      } = params;

      console.log({email, fullName, phone, country, gender, dateOfBirth, fbLink, igLink, youtubeLink, yTWelcomeLink, tikTokLink, wspLink, bio})

      if (!poi) {
        return {
          errors: {
            message: "Please connect your wallet"
          }
        }
      }

      const encryptedEmail = email ? encryptHex(email.trim()) : encryptHex(poi.email)
      const encryptedFullName = fullName ? encryptHex(fullName.trim()) : encryptHex(poi.fullName)
      const encryptedPhoneNumber = phone ? encryptHex(phone.trim()) : encryptHex(poi.phone)
      const encryptedCountry = country ? encryptHex(country.trim()) : encryptHex(poi.country)
      const encryptedGender = gender ? encryptHex(gender.trim()) : encryptHex(poi.gender)
      const encryptedDateOfBirth = dateOfBirth ? encryptHex(dateOfBirth.trim()) : encryptHex(poi.dateOfBirth)
      const encryptedFbLink = fbLink ? encryptHex(fbLink.trim()) : encryptHex(poi.fbLink)
      const encryptedIgLink = igLink ? encryptHex(igLink.trim()) : encryptHex(poi.igLink)
      const encryptedYoutubeLink = youtubeLink ? encryptHex(youtubeLink.trim()) : encryptHex(poi.youtubeLink)
      const encryptedYTWelcomeLink = yTWelcomeLink ? encryptHex(yTWelcomeLink.trim()) : encryptHex(poi.yTWelcomeLink)
      const encryptedTikTokLink = tikTokLink ? encryptHex(tikTokLink.trim()) : encryptHex(poi.tikTokLink)
      const encryptedWspLink = wspLink ? encryptHex(wspLink.trim()) : encryptHex(poi.wspLink)
      const encryptedBio = bio ? encryptHex(bio.trim()) : encryptHex(poi.bio)

      const errors = await validateUpdatePoi(params);

      if (errors) {
        return {
          errors
        }
      }

      const transaction = prepareContractCall({
        contract: poiContract,
        method: "updateUser",
        params: [
          encryptedEmail,
          encryptedFullName,
          encryptedPhoneNumber,
          encryptedCountry,
          encryptedGender,
          encryptedDateOfBirth,
          encryptedFbLink,
          encryptedIgLink,
          encryptedYoutubeLink,
          encryptedYTWelcomeLink,
          encryptedTikTokLink,
          encryptedWspLink,
          encryptedBio,
        ],
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
    updatePoi,
  }
}