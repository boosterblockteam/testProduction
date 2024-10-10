import { useTranslations } from "next-intl";

type StakingValidationParams = {
  amount: number;
}

export type StakingValidationError = {
  amount?: string;
  message?: string;
}

export function useValidateStaking(): {
  validateStaking: (params: StakingValidationParams) => Promise<StakingValidationError | null>;
} {

  const t = useTranslations();

  async function validateStaking({
    amount,
  }: StakingValidationParams): Promise<StakingValidationError | null> {

    try {

      const errors: StakingValidationError = {}

      if (amount < 0) {
        errors.amount = t("Amount must be greater than 0")
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
    validateStaking,
  }

}
  