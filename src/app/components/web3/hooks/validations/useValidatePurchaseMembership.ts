import { useTranslations } from "next-intl";
import { membershipContract } from "../../contracts/membership.contract";
import { readContract } from "thirdweb";

type PurchaseMembershipValidationParams = {
  referral: number;
}

export type PurchaseMembershipValidationError = {
  referral?: string;
  message?: string;
}

export function useValidatePurchaseMembership(): {
  validatePurchaseMembership: (params: PurchaseMembershipValidationParams) => Promise<PurchaseMembershipValidationError | null>;
} {

  const t = useTranslations();

  async function validatePurchaseMembership({
    referral,
  }: PurchaseMembershipValidationParams): Promise<PurchaseMembershipValidationError | null> {

    try {
      const errors: PurchaseMembershipValidationError = {}

      return null
      // pendiente: esta validación no va ya que si se puede crear la cuenta aunque el sponsor no tenga membership
      if (referral > 0) {
      
        const hasSponsorMembership = await readContract({ 
          contract: membershipContract,
          method: "haveMembership",
          params: [BigInt(referral)],
          gas: BigInt(100000)
        });

        if (!hasSponsorMembership) {
          errors.referral = t("Sponsor dont have membership")
        }
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
    validatePurchaseMembership,
  }
}