"use client";

import { useTranslations } from "next-intl";
import { encryptHex } from "../../utils/crypt";
import { readContract } from "thirdweb";
import { poiContract } from "../../contracts/poi.contract";
import { validateEmail, validateFullName, validatePhoneNumber, validateUrl, validateUserName } from "@/utils/value_object_register_steps";
import { UpdatePoiValidationParams } from "../useUpdatePoi";

type CreatePoiValidationParams = {
  email: string;
  fullName: string;
  username: string;
  phone: string;
}

export type CreatePoiValidationError = {
  email?: string;
  fullName?: string;
  username?: string;
  phone?: string;
  message?: string;
}

export type UpdatePoiValidationError = {
  email?: string;
  fullName?: string;
  phone?: string;
  country?: string;
  gender?: string;
  dateOfBirth?: string;
  imageLink?: string;
  fbLink?: string;
  igLink?: string;
  youtubeLink?: string;
  yTWelcomeLink?: string;
  tikTokLink?: string;
  wspLink?: string;
  bio?: string;
  message?: string;
}

export function useValidatePoi(): {
  validatePoi: (params: CreatePoiValidationParams) => Promise<CreatePoiValidationError | null>;
  validateUpdatePoi: (params: UpdatePoiValidationParams) => Promise<UpdatePoiValidationError | null>;
} {
  const t = useTranslations();

  async function validatePoi({
    email,
    fullName,
    username,
    phone,
  }: CreatePoiValidationParams): Promise<CreatePoiValidationError | null> {
  
    const errors: CreatePoiValidationError = {}

    // Validate format
    const errorEmailFormat = validateEmail(email);
    const errorFullNameFormat = validateFullName(fullName);
    const errorUsernameFormat = validateUserName(username);
    const errorPhoneFormat = validatePhoneNumber(phone);

    if (errorEmailFormat) {
      errors.email = errorEmailFormat;
    }

    if (errorFullNameFormat) {
      errors.fullName = errorFullNameFormat;
    }

    if (errorUsernameFormat) {
      errors.username = errorUsernameFormat;
    }

    if (errorPhoneFormat) {
      errors.phone = errorPhoneFormat;
    }
  
    if (Object.keys(errors).length > 0) {
      return errors
    }

    console.log({email, username, phone})

    // Validate duplicates
    const encryptedEmail = encryptHex(email)
    const encryptedUsername = encryptHex(username)
    const encryptedPhoneNumber = encryptHex(phone)

    console.log({encryptedEmail, encryptedUsername, encryptedPhoneNumber})
    
    try {
  
      const isUsedEmail = await readContract({ 
        contract: poiContract, 
        method: "usedEmails", 
        params: [encryptedEmail],
        gas: BigInt(100000)
      });
  
      const isUsedUsername = await readContract({ 
        contract: poiContract, 
        method: "usedUsernames", 
        params: [encryptedUsername],
        gas: BigInt(100000)
      });
  
      const isUsedPhone = await readContract({ 
        contract: poiContract, 
        method: "usedPhoneNumbers", 
        params: [encryptedPhoneNumber],
        gas: BigInt(100000)
      });

      console.log({isUsedEmail, isUsedUsername, isUsedPhone})
  
      if (isUsedEmail) {
        errors.email = t("This email is already in use, please choose another one")
      }
  
      if (isUsedUsername) {
        errors.username = t("This username is already in use, please choose another one")
      }
  
      if (isUsedPhone) {
        errors.phone = t("This phone number is already in use, please choose another one")
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

  async function validateUpdatePoi({
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
  }: UpdatePoiValidationParams): Promise<UpdatePoiValidationError | null> {
    const errors: UpdatePoiValidationError = {}


    // Validate format
    if (email) {
      const errorEmailFormat = validateEmail(email);
      if (errorEmailFormat) {
        errors.email = errorEmailFormat;
      }
    }

    if (fullName) {
      const errorFullNameFormat = validateFullName(fullName);
      if (errorFullNameFormat) {
        errors.fullName = errorFullNameFormat;
      }
    }

    if (phone) {
      const errorPhoneFormat = validatePhoneNumber(phone);
      if (errorPhoneFormat) {
        errors.phone = errorPhoneFormat;
      }
    }

    if (fbLink) {
      const errorFbLinkFormat = validateUrl(fbLink);
      if (errorFbLinkFormat) {
        errors.fbLink = errorFbLinkFormat;
      }
    }

    if (igLink) {
      const errorIgLinkFormat = validateUrl(igLink);
      if (errorIgLinkFormat) {
        errors.igLink = errorIgLinkFormat;
      }
    }

    if (youtubeLink) {
      const errorYoutubeLinkFormat = validateUrl(youtubeLink);
      if (errorYoutubeLinkFormat) {
        errors.youtubeLink = errorYoutubeLinkFormat;
      }
    }

    if (yTWelcomeLink) {
      const errorYTWelcomeLinkFormat = validateUrl(yTWelcomeLink);
      if (errorYTWelcomeLinkFormat) {
        errors.yTWelcomeLink = errorYTWelcomeLinkFormat;
      }
    }

    if (tikTokLink) {
      const errorTikTokLinkFormat = validateUrl(tikTokLink);
      if (errorTikTokLinkFormat) {
        errors.tikTokLink = errorTikTokLinkFormat;
      }
    }

    if (wspLink) {
      const errorWspLinkFormat = validateUrl(wspLink);
      if (errorWspLinkFormat) {
        errors.wspLink = errorWspLinkFormat;
      }
    }
    

    if (Object.keys(errors).length > 0) {
      return errors
    }

    return null

  }

  return {
    validatePoi,
    validateUpdatePoi,
  }
}