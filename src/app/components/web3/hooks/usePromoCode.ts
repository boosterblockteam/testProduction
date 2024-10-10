import { readContract } from "thirdweb";
import { membershipContract } from "../contracts/membership.contract";
import { useTranslations } from "next-intl";

export function usePromoCode(): {
  applyPromoCode: (code: string) => Promise<{
    errors: { message: string } | null,
    percentage: number
    isValid: boolean | null
  }>;
} {

  const t = useTranslations();

  async function applyPromoCode(code: string): Promise<{
    errors: { message: string } | null,
    percentage: number
    isValid: boolean | null
  }> {
    try {
      
      const promoCodeResponse = await readContract({ 
        contract: membershipContract,
        method: "promoCodes",
        params: [code],
      });

      const percentage: number = Number(promoCodeResponse[0])

      const isValid: boolean = promoCodeResponse[1]
      
      if (!isValid) {
        return {
          errors: {
            message: t("Invalid Code!")
          },
          percentage: 0,
          isValid: false
        }
      }

      return {
        errors: null,
        percentage,
        isValid
      }

    } catch (error) {
      console.log(error);

      return {
        errors: {
          message: "Error applying the code!"
        },
        percentage: 0,
        isValid: null
      }
    }
  }

  return {
    applyPromoCode,
  };
  
}