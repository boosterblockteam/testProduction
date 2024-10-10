"use client";
import { useState } from "react";
import Image from "next/image";
import IconLogo from "@/assets/imgs/LogoTipoPeq.png";
import { useTranslations } from "next-intl";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/app/components/generals/Navbar";
import InfoWalletNFT from "@/app/components/generals/InfoWalletNFT";
import CardPlans from "./components/CardPlans";
import { useRegister } from "@/app/components/web3/hooks/register/useRegister";
import { PlansMembership } from "@/app/[locale]/membership/moskData";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";
import { usePromoCode } from "@/app/components/web3/hooks/usePromoCode";
import ModalComponent from "@/app/components/generals/ModalComponent";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import { Membership } from "./types/membership";
import { formatCurrencyInteger } from "@/utils/formatCurrency";
// import ErrorTimeModal from "@/assets/icons/ErrorTimeModal.svg";

interface Props {
  listPlans: Membership[];
}

const SelectMembership = ({ listPlans }: Props) => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const { loadBuyMembershipParams, clearMembershipParams, clearStakingParams, getRegisterFormsData } = useRegister();

  const [membershipsOptions, setMembershipsOptions] = useState<Membership[]>(listPlans);
  const [selectedPlan, setSelectedPlan] = useState<Membership>(membershipsOptions[0]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoCodeApplied, setPromoCodeApplied] = useState("");
  const [promoCodePercent, setPromoCodePercent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<"idle" | "success" | "used" | "invalid" | "error">("idle");
  const [modalMessage, setModalMessage] = useState("");
  const { applyPromoCode } = usePromoCode();

  const confirmMembership = async () => {
    if (selectedPlan) {
      const { accountParams } = getRegisterFormsData();

      if (!accountParams) {
        openModal();
        setModalStatus("error");
        setModalMessage(`${t("You haven't selected an NFT yet! Go back to the NFT page and select one.")}`);
        return;
      }

      const { sponsor, legSide } = getSponsoAndLegSideFromUrl();

      const errors = await loadBuyMembershipParams({
        id: selectedPlan.id,
        nftUse: accountParams.nftNumber,
        minStake: formatCurrencyInteger(selectedPlan.minStake),
        maxStake: formatCurrencyInteger(selectedPlan.maxStake),
        promoCode: promoCodeApplied,
        percentage: promoCodePercent,
        price: selectedPlan.price,
        referral: sponsor,
      });

      if (errors) {
        console.log(errors);
        return;
      }

      if (pathname === "/membership") {
        const queryString = `sponsor=${sponsor}&legside=${legSide}`;
        router.push(`/staking?${queryString}`);
      } else if (pathname === "/myTeam/new-own-account") {
        router.push("/myTeam/new-own-account/stake");
      } else if (pathname === "/my-nfts/buy-nft/select-membership") {
        router.push("/my-nfts/buy-nft/stake");
      } else if (pathname === "/members/selectMember") {
        router.push("/members/stake");
      } else {
        router.push("/myTeam/new-partner/stake");
      }
    }
  };

  function skip() {
    clearMembershipParams();
    clearStakingParams();
    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();

    if (pathname === "/membership") {
      router.push(`/totalPayment?sponsor=${sponsor}&legside=${legSide}`);
    } else if (pathname === "/myTeam/new-own-account/select-membership") {
      router.push(`/myTeam/new-own-account/total-payment`);
    } else if (pathname === "/my-nfts/buy-nft/select-membership") {
      router.push(`/my-nfts/buy-nft/total-payment`);
    } else if (pathname === "/members/selectMember") {
      router.push("/members/total-payment");
    } else {
      router.push(`/myTeam/new-partner/total-payment`);
    }
  }

  function back() {
    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
    const url = `/purchaseNft?sponsor=${sponsor}&legside=${legSide}`;
    router.push(url);
  }

  async function applyCode() {
    if (promoCode) {
      const { errors, isValid, percentage } = await applyPromoCode(promoCode);

      openModal();

      if (errors) {
        setPromoCodePercent(0);
        setModalMessage(errors.message);

        if (isValid === null) {
          setModalStatus("error");
        }

        if (isValid === false) {
          setModalStatus("invalid");
        }

        return;
      }

      setPromoCodePercent(percentage);
      setModalStatus("success");
      setModalMessage(`${t("Code Successfully Applied!")}`);
      setPromoCodeApplied(promoCode);
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setModalStatus("idle");
    setIsModalOpen(false);
  }

  return (
    <div
      className={`container-Membership min-h-screen flex flex-col justify-between ${
        pathname === "/membership" ? "pb-6 pt-[177px]" : "pb-[63px] pt-[142px]"
      }`}
    >
      <div>
        <div
          className={`header ${
            pathname === "/membership" ? "-headermembership" : "-header-otherMembers"
          } fixed top-0 z-50 w-full lg:max-w-[360px] lg:mx-auto`}
        >
          {pathname !== "/membership" ? (
            <div>
              <Navbar
                text={
                  pathname === "/myTeam/new-own-account/select-membership"
                    ? t("New Own Account")
                    : pathname === "/my-nfts/buy-nft/select-membership"
                    ? t("Buy NFT")
                    : pathname === "/members/selectMember"
                    ? t("Membership")
                    : t("New Partner")
                }
              />
            </div>
          ) : (
            <div className={`header-logo1 flex justify-between mb-8`}>
              <div className="flex items-center">
                <div>
                  <Image src={IconLogo} alt="logo" width={28} height={24} />
                </div>
                <div className="ml-2">
                  <div className="text-[12px] text-white">
                    <p>
                      {t("STEP")} 3 {t("OF")} 5
                    </p>
                    <p className="text-[14px] text-[#20DABB] font-bold mt-1">{t("MEMBERSHIP")}</p>
                  </div>
                </div>
              </div>
              <InfoWalletNFT />
            </div>
          )}

          <div className="header-title">
            <h1>{t("Select Membership")}</h1>
            <p>{t("This is a one-time annual payment You can upgrade your plan whenever you wish")}</p>
          </div>
        </div>

        <CardPlans
          membershipsOptions={membershipsOptions}
          setMembershipsOptions={setMembershipsOptions}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      </div>

      <div>
        <div className={`px-[24px] ${pathname === "/membership" ? "mb-4" : "mb-[0px]"}`}>
          <div className={`my-4  relative`}>
            <input
              type="text"
              placeholder={t("Promo code")}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className={`relative px-4 py-[10px] bg-[#F2F3F8] rounded-[10px] w-full font-bold text-[16px] text-[#A9AEB4]`}
            />
            <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#7A2FF4] font-bold`} onClick={() => applyCode()}>
              {t("Apply")}
            </span>
          </div>
          <div className="w-full mx-auto  text-center mb-4">
            <button className={`border-b border-solid border-[#A9AEB4] text-[16px] font-bold text-[#A9AEB4] cursor-pointer`} onClick={() => skip()}>
              {t("Skip Now")}
            </button>
          </div>
        </div>

        <div className={`flex items-center px-6 ${pathname === "/membership" ? "pb-0" : "pb-[24px]"}`}>
          <div className="w-1/3">
            <ButtonSecondary text={t("Back")} onClickFn={() => back()} classname="buttonBack" />
          </div>

          <div className="w-2/3 ml-4">
            {selectedPlan ? (
              <ButtonPrimary text={t("Next")} onClickFn={confirmMembership} />
            ) : (
              <ButtonPrimary text={t("Next")} onClickFn={confirmMembership} disabled={true} />
            )}
          </div>
        </div>
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        classBody="relative bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg py-8 px-2"
      >
        {true && (
          <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => closeModal()}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
        )}
        {isModalOpen && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              {modalStatus === "success" ? (
                <Image src={CheckDone} alt="Check done" width={60} height={60} />
              ) : (
                <Image src={RechazedIcon} alt="Declined" width={60} height={60} />
              )}
            </div>
            <div className="mt-8 text-center">
              <p className="text-[18px] text-[#A9AEB4]">{modalMessage}</p>
            </div>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default SelectMembership;
