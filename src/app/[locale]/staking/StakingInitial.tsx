"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { usePathname, useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import InfoWalletNFT from "@/app/components/generals/InfoWalletNFT";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { useRegister } from "@/app/components/web3/hooks/register/useRegister";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";
import Navbar from "@/app/components/generals/Navbar";
import { ServiceProvider } from "@/app/components/providers/service.provider";
import { useUser } from "@/app/components/web3/context/UserProvider";

const StakingInitial = () => {
  const t = useTranslations();
  const [amount, setAmount] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const [minAmount, setMinAmount] = useState<string>("$ 200");
  const [maxAmount, setMaxAmount] = useState<string>("$ 15,000");
  const [min, setMin] = useState<number>(200);
  const [max, setMax] = useState<number>(15000);
  const [error, setError] = useState("");
  const { loadStakingParams, clearStakingParams, getRegisterFormsData } = useRegister();
  const { user } = useUser();

  const buttonStake = async () => {
    if (!user?.selectedAccount) {
      setError(t("Please connect your wallet"));
      return;
    }
    const { accountService } = ServiceProvider.getInstance().getServices();

    if (Number(amount) < min) {
      setError(t(`Amount must be greater than`) + minAmount);
      return;
    }

    if (Number(amount) > max) {
      setError(t(`Amount must be less than`) + maxAmount);
      return;
    }

    if (pathname === "/staking") {
      const { accountParams } = getRegisterFormsData();

      if (accountParams) {
        const errors = await loadStakingParams({
          amount: Number(amount),
          nftUse: accountParams.nftNumber,
          index: 0,
        });

        if (errors) {
          console.log(errors);
          setError(errors.amount || errors.message || "");
          return;
        }
      }

      const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
      router.push(`/totalPayment?sponsor=${sponsor}&legside=${legSide}`);
    } else if (pathname === "/myTeam/new-own-account/stake") {
      router.push(`/myTeam/new-own-account/total-payment`);
    } else if (pathname === "/my-nfts/buy-nft/stake") {
      const { accountParams } = getRegisterFormsData();

      if (accountParams) {

        const errors = await loadStakingParams({
          amount: Number(amount),
          nftUse: accountParams.nftNumber,
          index: 0,
        });

        if (errors) {
          console.log(errors);
          setError(errors.amount || errors.message || "");
          return;
        }
      } else {
        setError(t("You need to select an NFT first"));
        return;
      }

      router.push(`/my-nfts/buy-nft/total-payment`);
    } else if (pathname === "/members/stake") {

      const { account } = await accountService.getSelectedAccount(user.selectedAccount.wallet)

      const stakeIndex = account.accountMemberships.length;

      const errors = await loadStakingParams({
        amount: Number(amount),
        nftUse: user.selectedAccount.idAccount,
        index: stakeIndex,
      });

      if (errors) {
        console.log(errors);
        setError(errors.amount || errors.message || "");
        return;
      }

      router.push(`/members/total-payment`);
    } else {
      router.push(`/myTeam/new-partner/total-payment`);
    }
  };

  useEffect(() => {
    const { membershipParams } = getRegisterFormsData();

    if (membershipParams) {
      setMinAmount("$ " + membershipParams.minStake);
      setMaxAmount("$ " + membershipParams.maxStake);
      setMin(Number(membershipParams.minStake.replaceAll(",", "")));
      setMax(Number(membershipParams.maxStake.replaceAll(",", "")));
    }
  }, []);

  function skip() {
    clearStakingParams();

    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();

    if (pathname === "/staking") {
      router.push(`/totalPayment?sponsor=${sponsor}&legside=${legSide}`);
    } else if (pathname === "/myTeam/new-own-account/stake") {
      router.push(`/myTeam/new-own-account/total-payment?sponsor=${sponsor}`);
    } else if (pathname === "/my-nfts/buy-nft/stake") {
      router.push(`/my-nfts/buy-nft/total-payment?sponsor=${sponsor}`);
    } else if (pathname === "/members/stake") {
      router.push(`/members/total-payment?sponsor=${sponsor}`);
    } else {
      router.push(`/myTeam/new-partner/total-payment?sponsor=${sponsor}`);
    }
  }

  function back() {
    let url = "/";
    if (pathname === "/staking") {
      const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
      url = `/membership?sponsor=${sponsor}&legside=${legSide}`;
    } else if (pathname === "/my-nfts/buy-nft/stake") {
      url = "/my-nfts/buy-nft/select-membership";
    }
    router.push(url);
  }

  return (
    <div
      className={`${
        pathname === "/staking" ? "px-6 pt-4" : "px-0 pt-0"
      } min-h-screen pb-6 flex flex-col justify-between  bg-gradient-to-t from-[#0E0E33] to-[#39307B] text-white`}
    >
      {pathname === "/staking" ? (
        <div className="container-header">
          <div className="container-logo flex justify-between">
            <div className="flex items-center">
              <div>
                <Image src={LogoPeq} alt="logo" width={28} height={24} />
              </div>
              <div className="ml-2">
                <div className="text-[12px] text-white">
                  <p>
                    {t("STEP")} 4 {t("OF")} 5
                  </p>
                  <p className="text-[14px] text-[#20DABB] font-bold mt-1">{t("STAKING")}</p>
                </div>
              </div>
            </div>
            <InfoWalletNFT />
          </div>
        </div>
      ) : (
        <div className="px-6 pt-4">
          <Navbar
            text={
              pathname === "/myTeam/new-own-account/stake"
                ? t("New Own Account")
                : pathname === "/my-nfts/buy-nft/stake"
                ? t("Buy NFT")
                : pathname === "/members/stake"
                ? t("Membership")
                : t("New Partner")
            }
          />
        </div>
      )}

      <div
        className={`${
          pathname === "/staking" ? "mx-0" : "mx-6"
        } container-Stake-amount text-white p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-gradient-to-t from-[#0E0E33] to-[#39307B] shadow-md`}
      >
        <h2 className="text-[24px] font-bold mb-4">{t("Stake")}</h2>
        <div className=" rounded-[10px] border border-solid border-[#ffffff1a] p-2">
          <p className="text-[14px] font-bold mb-4">{t("Amount")}</p>

          <div className="container-input relative">
            <input
              type="number"
              className="rounded-[10px] p-4 bg-[#ffffff1a] w-full text-white"
              value={amount}
              onChange={(e) => {
                setError("");
                setAmount(e.target.value);
              }}
              placeholder="$ 0"
            />
          </div>
          <div className="flex justify-between items-center mt-2 mb-4">
            <p className="text-[10px] ">
              <b>{t("MIN")}.:</b> {minAmount}
            </p>

            <p className="text-[10px] ">
              <b>{t("MAX")}.:</b> {maxAmount}
            </p>
          </div>
        </div>
        {error && (
          <div className="mt-4 text-center">
            <p className="textErrorInputDark">{error}</p>
          </div>
        )}
      </div>

      <div className={`w-full mx-auto mt-8 text-center ${pathname === "/staking" ? "mb-0" : "mb-[40px]"}`}>
        <button className="border-b border-solid border-[#A9AEB4] text-[16px] font-bold text-[#A9AEB4] cursor-pointer" onClick={() => skip()}>
          {t("Skip Now")}
        </button>

        <div className={`flex items-center mt-4 ${pathname === "/staking" ? "pb-0 px-0" : "px-6 pb-6"}`}>
          <div className="w-1/3">
            <ButtonSecondary text={t("Back")} onClickFn={() => back()} classname="buttonBack" />
          </div>

          <div className="w-2/3 ml-4">
            <ButtonPrimary text={t("Next")} onClickFn={buttonStake} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingInitial;
