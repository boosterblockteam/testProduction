import { Membership, useBuyMembership } from "./useBuyMembership";
import { Nft, useBuyNft } from "./useBuyNft";
import { usePoi } from "./usePoi";
import { Staking, useStaking } from "./useStaking";
import { CreatePoiValidationError, useValidatePoi } from "../validations/useValidatePoi";
import { BuyNftValidationError, useValidateNft } from "../validations/useValidateNft";
import { PurchaseMembershipValidationError, useValidatePurchaseMembership } from "../validations/useValidatePurchaseMembership";
import { StakingValidationError, useValidateStaking } from "../validations/useValidateStaking";
import { CreatePoi } from "../../types/poi";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { tokenContract } from "../../contracts/token.contract";
import { nftContract } from "../../contracts/nft.contract";
import { useActiveAccount } from "thirdweb/react";
import { useTranslations } from "next-intl";
import { waitForTransactionHash } from "../../utils/waitForTransactionHash";
import { membershipContract } from "../../contracts/membership.contract";
import { stakingContract } from "../../contracts/staking.contract";
import { mainGasPrice } from "../../prices/gas-prices";

export type Register = {
  poi: CreatePoi;
  account: Nft;
  membership: Membership;
  staking: Staking;
}

export function useRegister(): {
  createPoiFromStorage: () => Promise<{
    errors: CreatePoiValidationError | null;
  }>;
  buyNftFromStorage: () => Promise<{
    errors: BuyNftValidationError | null;
  }>;
  buyMembershipFromStorage: () => Promise<{
    errors: PurchaseMembershipValidationError | null;
  }>;
  stakingFromStorage: () => Promise<{
    errors: StakingValidationError | null;
  }>;
  approveBuyNFT: () => Promise<{
    errors: { message: string } | null
  }>;
  approveBuyMembership: (amount: number) => Promise<{
    errors: { message: string } | null
  }>;
  approveStaking: (amount: number) => Promise<{
    errors: { message: string } | null
  }>;
  loadCreatePoiParams: (params: CreatePoi) => Promise<CreatePoiValidationError | null>;
  loadBuyNftParams: (params: Nft) => Promise<BuyNftValidationError | null>;
  loadBuyMembershipParams: (params: Membership & { referral: number }) => Promise<PurchaseMembershipValidationError | null>;
  loadStakingParams: (params: Staking) => Promise<StakingValidationError | null>;
  clearPoiParams: () => void;
  clearNftParams: () => void;
  clearMembershipParams: () => void;
  clearStakingParams: () => void;
  getRegisterFormsData: () => {
    poiParams: CreatePoi | null;
    accountParams: Nft | null;
    membershipParams: Membership | null;
    stakingParams: Staking | null;
  }
  clearRegisterFormsData: () => void;
} {

  const t = useTranslations();
  const account = useActiveAccount();

  const { createPoi } = usePoi();
  const { buyNft } = useBuyNft();
  const { buyMembership } = useBuyMembership();
  const { staking } = useStaking();

  const { validatePoi } = useValidatePoi();
  const { validateNft } = useValidateNft();
  const { validatePurchaseMembership } = useValidatePurchaseMembership();
  const { validateStaking } = useValidateStaking();

  async function loadCreatePoiParams(params: CreatePoi): Promise<CreatePoiValidationError | null> {
    const errors = await validatePoi(params);

    if (errors) {
      return errors
    }

    localStorage.setItem("poiParams", JSON.stringify(params));
    showData()

    return null
  }

  async function loadBuyNftParams(params: Nft): Promise<BuyNftValidationError | null> {
    const errors = await validateNft(params);

    if (errors) {
      return errors
    }

    localStorage.setItem("accountParams", JSON.stringify(params));
    showData()

    return null
  }

  async function loadBuyMembershipParams(params: Membership & { referral: number }): Promise<PurchaseMembershipValidationError | null> {
    const { referral, ...membershipParams } = params;

    const errors = await validatePurchaseMembership({ referral });

    if (errors) {
      return errors
    }

    localStorage.setItem("membershipParams", JSON.stringify(membershipParams));
    showData()

    return null
  }

  async function loadStakingParams(params: Staking): Promise<StakingValidationError | null> {
    const errors = await validateStaking(params);

    if (errors) {
      return errors
    }

    localStorage.setItem("stakingParams", JSON.stringify(params));
    showData()

    return null
  }

  async function approveBuyNFT(): Promise<{
    errors: { message: string } | null
  }> {

    if (!account) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    const approvalToken = prepareContractCall({
      contract: tokenContract, 
      method: "approve", 
      params: [nftContract.address, BigInt(30000000)],
      gasPrice: mainGasPrice,
    });

    const { transactionHash: approvalTokenHash } = await sendTransaction({
      account,
      transaction: approvalToken,
    });

    console.log({approvalTokenHash});

    const approveError = await waitForTransactionHash(approvalTokenHash); 

    if (approveError) {
      return {
        errors: {
          message: "Error to approve the token to pay"
        }
      }
    }

    return {
      errors: null
    }

  }

  async function approveBuyMembership(amount: number): Promise<{
    errors: { message: string } | null
  }> {

    if (!account) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    amount = amount * 1000000

    const approvalToken = prepareContractCall({
      contract: tokenContract, 
      method: "approve", 
      params: [membershipContract.address, BigInt(amount)], //ANTONIO: Esto debe tomar el valor de la membresia y multipliarlo por 1000000 (6 decimales)
                                                                //JOACO: Dejar toda las membresias con 6 decimales
      gasPrice: mainGasPrice,
    });

    const { transactionHash: approvalTokenHash } = await sendTransaction({
      account,
      transaction: approvalToken,
    });

    console.log({approvalTokenHash});

    const approveError = await waitForTransactionHash(approvalTokenHash); 

    if (approveError) {
      return {
        errors: {
          message: "Error to approve the token to pay"
        }
      }
    }

    return {
      errors: null
    }

  }

  async function approveStaking(amount: number): Promise<{
    errors: { message: string } | null
  }> {

    if (!account) {
      return {
        errors: {
          message: t("Please connect your wallet")
        }
      }
    }

    amount = amount * 1000000
    
    const approvalToken = prepareContractCall({
      contract: tokenContract, 
      method: "approve", 
      params: [stakingContract.address, BigInt(amount)],
      gasPrice: mainGasPrice,
    });

    const { transactionHash: approvalTokenHash } = await sendTransaction({
      account,
      transaction: approvalToken,
    });

    console.log({approvalTokenHash});

    const approveError = await waitForTransactionHash(approvalTokenHash); 

    if (approveError) {
      return {
        errors: {
          message: "Error to approve the token to pay"
        }
      }
    }
    
    return {
      errors: null
    }
  }

  function getRegisterFormsData(): {
    poiParams: CreatePoi | null;
    accountParams: Nft | null;
    membershipParams: Membership | null;
    stakingParams: Staking | null;
  } {
    const poiParamsStorage = localStorage.getItem("poiParams");
    const accountParamsStorage = localStorage.getItem("accountParams");
    const membershipParamsStorage = localStorage.getItem("membershipParams");
    const stakingParamsStorage = localStorage.getItem("stakingParams");

    const poiParams = poiParamsStorage ? JSON.parse(poiParamsStorage) as CreatePoi : null;
    const accountParams = accountParamsStorage ? JSON.parse(accountParamsStorage) as Nft : null;
    const membershipParams = membershipParamsStorage ? JSON.parse(membershipParamsStorage) as Membership : null;
    const stakingParams = stakingParamsStorage ? JSON.parse(stakingParamsStorage) as Staking : null;

    return {
      poiParams,
      accountParams,
      membershipParams,
      stakingParams,
    };
  }

  function showData() {
    const data = getRegisterFormsData();
    console.log(data);
  }
    
  function clearPoiParams() {
    localStorage.removeItem("poiParams");
  }

  function clearNftParams() {
    localStorage.removeItem("accountParams");
  }

  function clearMembershipParams() {
    localStorage.removeItem("membershipParams");
  }

  function clearStakingParams() {
    localStorage.removeItem("stakingParams");
  }
    

  function clearRegisterFormsData() {

    clearPoiParams()
    clearNftParams()
    clearMembershipParams()
    clearStakingParams()

  }

  const createPoiFromStorage = async (): Promise<{
    errors: CreatePoiValidationError | null;
  }> => {
    const { poiParams } = getRegisterFormsData();
    if (!poiParams) {
      return {
        errors: {
          message: "Proof of Identity is empty"
        }
      }
    }
    return createPoi(poiParams)
  }

  const buyNftFromStorage = async (): Promise<{
     errors: CreatePoiValidationError | null;
  }> => {
    const { accountParams } = getRegisterFormsData();
    if (!accountParams) {
      return {
        errors: {
          message: "NFT is empty"
        }
      }
    }
    
    return buyNft(accountParams)
  }

  const buyMembershipFromStorage = async (): Promise<{
   errors: CreatePoiValidationError | null;
  }> => {
    const { membershipParams } = getRegisterFormsData();
    if (!membershipParams) {
      return {
        errors: {
          message: "Membership is empty"
        }
      }
    }
    
    return buyMembership(membershipParams)
  }

  const stakingFromStorage = async (): Promise<{
   errors: StakingValidationError | null;
  }> => {
    const { stakingParams } = getRegisterFormsData();
    if (!stakingParams) {
      return {
        errors: {
          message: "Staking is empty"
        }
      }
    }

    return staking(stakingParams)
  }

  return {
    createPoiFromStorage,
    buyNftFromStorage,
    buyMembershipFromStorage,
    stakingFromStorage,
    approveBuyNFT,
    approveBuyMembership,
    approveStaking,
    loadCreatePoiParams,
    loadBuyNftParams,
    loadBuyMembershipParams,
    loadStakingParams,
    clearPoiParams,
    clearNftParams,
    clearMembershipParams,
    clearStakingParams,
    getRegisterFormsData,
    clearRegisterFormsData,
  }

}
