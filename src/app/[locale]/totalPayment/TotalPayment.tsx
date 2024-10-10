"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import { useTranslations } from "next-intl";
import SponsorData from "../register/components/SponsorData";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { usePathname, useRouter } from "next/navigation";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import CirclePurple from "@/assets/icons/circle-purple-modal.svg";
import HeaderPages from "@/app/components/generals/HeaderPages";
import InfoWalletNFT from "@/app/components/generals/InfoWalletNFT";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRegister } from "@/app/components/web3/hooks/register/useRegister";
import { formatCurrencyDecimal, formatCurrencyInteger } from "@/utils/formatCurrency";
import { useBalance } from "@/app/components/web3/hooks/useBalance";
import { useGetPoi } from "@/app/components/web3/hooks/useGetPoi";
import { useGetNftAccount } from "@/app/components/web3/hooks/useGetNftAccount";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";
import { useWalletDetailsModal } from "thirdweb/react";
import { client } from "@/app/components/web3/client";
import Navbar from "@/app/components/generals/Navbar";
import { connectButtonOptions } from "@/app/components/web3/components/ConnectWalletButton";

const TotalPayment = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [discount, setDiscount] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "processing" | "declined">("idle");

  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [isApprovedBuyNFT, setIsApprovedBuyNFT] = useState(false);
  const [isBoughtNft, setIsBoughtNft] = useState(false);
  const [isApprovedBuyMembership, setIsApprovedBuyMembership] = useState(false);
  const [isBoughtMembership, setIsBoughtMembership] = useState(false);
  const [isApprovedStaking, setIsApprovedStaking] = useState(false);
  const [isStaked, setIsStaked] = useState(false);

  const [hasToRegister, setHasToRegister] = useState(false);
  const [hastoBuyNFT, setHastoBuyNFT] = useState(false);
  const [hasToBuyMembership, setHasToBuyMembership] = useState(false);
  const [hasToStake, setHasToStake] = useState(false);

  const [paymentError, setPaymentError] = useState("");
  const [toastedError, setToastedError] = useState("");
  const { balance, polBalance } = useBalance();

  const [memberValue, setMemberValue] = useState<number>(0);

  const [stakingValue, setStakingValue] = useState<number>(0);

  const [totalValue, setTotalValue] = useState<number>(0);

  const { poi, isLoading: isLoadingPoi } = useGetPoi();
  const { nftAccount, isLoading: isLoadingNftAccount } = useGetNftAccount();

  const detailsModal = useWalletDetailsModal();

  const {
    getRegisterFormsData,
    createPoiFromStorage,
    approveBuyNFT,
    buyNftFromStorage,
    approveBuyMembership,
    buyMembershipFromStorage,
    approveStaking,
    stakingFromStorage,
  } = useRegister();

  useEffect(() => {
    const { membershipParams, stakingParams } = getRegisterFormsData();

    let membershipPrice = 0;
    let percentage = 0;
    let stakingAmount = 0;
    let discount = 0;

    if (membershipParams) {
      setMemberValue(membershipParams.price);
      membershipPrice = membershipParams.price;

      if (membershipParams.percentage) {
        percentage = membershipParams.percentage;
        discount = (membershipPrice * percentage) / 100;
        setDiscount(percentage);
      }
    }

    if (stakingParams) {
      setStakingValue(stakingParams.amount);
      stakingAmount = stakingParams.amount;
    }

    const total = 30 + membershipPrice - discount + stakingAmount;

    setTotalValue(total);
  }, []);

  useEffect(() => {
    const { accountParams, membershipParams, stakingParams } = getRegisterFormsData();

    setHasToRegister(!poi);
    setHastoBuyNFT(Boolean(accountParams));
    setHasToBuyMembership(Boolean(membershipParams));
    setHasToStake(Boolean(stakingParams));
  }, [poi]);

  const buttonProceedWithPayment = async () => {
    setIsModalOpen(true);
    setStatus("processing");
    setIsRegisteredUser(false);
    setIsApprovedBuyNFT(false);
    setIsBoughtNft(false);
    setIsApprovedBuyMembership(false);
    setIsBoughtMembership(false);
    setIsApprovedStaking(false);
    setIsStaked(false);

    try {
      const { membershipParams, stakingParams } = getRegisterFormsData();

      if (poi === null) {
        const { errors: errorsCreatePoi } = await createPoiFromStorage();
        if (errorsCreatePoi) {
          setStatus("declined");
          setPaymentError(
            errorsCreatePoi.email || errorsCreatePoi.fullName || errorsCreatePoi.username || errorsCreatePoi.phone || errorsCreatePoi.message || ""
          );
          return;
        }
      }
      setIsRegisteredUser(true);

      if (nftAccount === null) {
        const { errors: errorsApproveBuyNFT } = await approveBuyNFT();

        if (errorsApproveBuyNFT) {
          setStatus("declined");
          setPaymentError(errorsApproveBuyNFT.message || "");
          return;
        }
        setIsApprovedBuyNFT(true);

        const { errors: errorsBuyNft } = await buyNftFromStorage();
        if (errorsBuyNft) {
          setStatus("declined");
          setPaymentError(errorsBuyNft.nameAccount || errorsBuyNft.nftNumber || errorsBuyNft.message || "");
          return;
        }
      }
      setIsBoughtNft(true);

      if (membershipParams) {
        const { errors: errorsApproveBuyMembership } = await approveBuyMembership(membershipParams.price);

        if (errorsApproveBuyMembership) {
          setStatus("declined");
          setPaymentError(errorsApproveBuyMembership.message || "");
          return;
        }
        setIsApprovedBuyMembership(true);

        const { errors: errorsBuyMembership } = await buyMembershipFromStorage();
        if (errorsBuyMembership) {
          setStatus("declined");
          setPaymentError(errorsBuyMembership.referral || errorsBuyMembership.message || "");
          return;
        }
        setIsBoughtMembership(true);
      }

      if (stakingParams) {
        const { errors: errorsApproveStaking } = await approveStaking(stakingParams.amount);

        if (errorsApproveStaking) {
          setStatus("declined");
          setPaymentError(errorsApproveStaking.message || "");
          return;
        }
        setIsApprovedStaking(true);

        const { errors: errorsStaking } = await stakingFromStorage();
        if (errorsStaking) {
          setStatus("declined");
          setPaymentError(errorsStaking.amount || errorsStaking.message || "");
          return;
        }
        setIsStaked(true);
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setStatus("success");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (pathname === "/totalPayment") {
        router.push("/dashboard");
      } else if (pathname === "/my-nfts/buy-nft/total-payment") {
        router.push("/my-nfts");
      } else if (pathname === "/members/total-payment") {
        router.push("/members");
      } else {
        router.push("/myTeam");
      }
    } catch (error) {
      setStatus("declined");
      console.log(error);
    }
  };

  function closeModal() {
    setIsModalOpen(false);
    setStatus("idle");
    setPaymentError("");
  }

  function showError(error: string) {
    return toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: "text-[#554D77] bg-red-200 absolute top-20 right-0",
    });
  }

  function back() {
    const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
    const url = `/staking?sponsor=${sponsor}&legside=${legSide}`;
    router.push(url);
  }

  async function handleConnectToAddFunds() {
    detailsModal.open({
      client,
      ...connectButtonOptions,
    });
  }

  return (
    <div
      className={`${
        pathname === "/totalPayment" ? "px-6 pb-6 pt-4" : "px-0 pb-6 pt-0"
      } min-h-screen bg-gradient-to-t from-[#0E0E33] to-[#39307B]  text-white `}
    >
      {pathname === "/totalPayment" ? (
        <div className="container-header pb-8 h-[74px]">
          <div className="container-logo flex justify-between">
            <div className="flex items-center">
              <div>
                <Image src={LogoPeq} alt="logo" width={28} height={24} />
              </div>
              <div className="ml-2">
                <div className="text-[12px] text-white">
                  <p>
                    {t("STEP")} 5 {t("OF")} 5
                  </p>
                  <p className="text-[14px] text-[#20DABB] font-bold mt-1">{t("PAYMENT")}</p>
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
              pathname === "/myTeam/new-own-account/total-payment"
                ? t("New Own Account")
                : pathname === "/my-nfts/buy-nft/total-payment"
                ? t("Buy NFT")
                : pathname === "/members/total-payment"
                ? t("Membership")
                : t("New Partner")
            }
          />
        </div>
      )}

      <div
        className={` ${
          pathname === "/totalPayment" ? "pt-0 px-0 min-h-[calc(100vh-114px)]" : "pt-0 px-6 min-h-[calc(100vh-117px)]"
        } flex flex-col justify-between `}
      >
        <div>
          <div className={`${pathname === "/totalPayment" ? "mb-8" : "mb-6"}`}>
            <div className={`${pathname === "/totalPayment" ? "mb-8" : "mb-6"} rounded-2xl border border-solid border-[#ffffff40] p-2 `}>
              <div className="text-center rounded-[10px] bg-gradient-to-t from-[#ffffff1a] to-[#ffffff00] p-2">
                <p className="text-[14px] mb-2">{t("Wallet Balance")}</p>
                <p className="text-[24px] font-bold">
                  $ {formatCurrencyInteger(balance)}
                  <span className="text-[16px]">{formatCurrencyDecimal(balance)}</span>
                </p>
              </div>
            </div>
            <SponsorData
              classContainer="rounded-[8px] border border-solid border-[#ffffff1a] py-2 px-4 flex items-center justify-between text-[#A9AEB4]"
              classValor="text-[14px] text-white"
            />
          </div>

          <div className="py-6 px-4 rounded-[10px] bg-[#ffffff1a] text-white">
            <h1 className="text-[24px] font-bold mb-[40px]">{t("Total Payment")}</h1>

            <div className="flex justify-between border-b border-solid border-[#ffffff1a] pb-4">
              <p className="text-[14px] font-bold">{t("User Registration")}</p>
              <p className="text-[14px]">$0</p>
            </div>

            <div className="flex justify-between border-b border-solid border-[#ffffff1a] py-4">
              <p className="text-[14px] font-bold">{t("NFT")}</p>
              <p className="text-[14px]">$30</p>
            </div>

            <div className=" border-b border-solid border-[#ffffff1a] py-4">
              <div className="flex justify-between">
                <p className="text-[14px] font-bold">{t("Membership")}</p>
                {discount ? (
                  <p className={`${discount ? "text-[#ffffff4d] line-through" : "text-white no-underline"} text-[14px]`}>${memberValue}</p>
                ) : (
                  <p className="text-[14px]">${memberValue}</p>
                )}
              </div>
              {discount && (
                <div className="flex justify-between mt-1">
                  <p className="text-[10px] font-bold rounded-[20px] border border-solid border-[#20DABB] text-[#20DABB] py-[2px] px-[6px]">{`${t(
                    "DISCOUNT"
                  )} ${discount}%`}</p>
                  <p className="text-[14px]">${(memberValue * (1 - discount / 100)).toFixed(2)}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between border-b border-solid border-white py-4">
              <p className="text-[14px] font-bold">{t("Stake")}</p>
              {<p className="text-[14px]">${stakingValue}</p>}
            </div>

            <div className="flex justify-between pt-4 ">
              <p className="text-[18px] font-bold">{t("Total")}</p>
              <p className="text-[18px]">${totalValue}</p>
            </div>
          </div>
        </div>

        <div className={`flex items-center mt-4 ${pathname === "/totalPayment" ? "pb-0" : "pb-6"}`}>
          <div className="w-1/3">
            <ButtonSecondary text={t("Back")} onClickFn={() => back()} classname="buttonBack" />
          </div>

          {balance < totalValue || polBalance < 0.1 ? (
            <div className="w-2/3 ml-2">
              <ButtonPrimary text={t("Add Funds")} onClickFn={() => handleConnectToAddFunds()} />
            </div>
          ) : (
            <div className="w-2/3 ml-4">
              <ButtonPrimary disabled={isLoadingPoi || isLoadingNftAccount} text={t("Proceed")} onClickFn={buttonProceedWithPayment} />
            </div>
          )}
        </div>
        <ModalComponent
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          classBody="relative bg-white w-[315px] h-[410px] rounded-[20px] shadow-lg py-8 px-6"
        >
          {status === "declined" && (
            <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => closeModal()}>
              <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
            </div>
          )}
          {isModalOpen &&
            (status === "success" ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <Image src={CheckDone} alt="Check done" width={60} height={60} />
                </div>
                <div className="mt-2 text-center">
                  {pathname === "/totalPayment" ? (
                    <p className="text-[16px] text-[#554D77]">
                      {t("Successful registration and payment")}! <span className="font-bold">{t("Welcome to DeFily")}!</span>
                    </p>
                  ) : (
                    <p className="text-[16px] text-[#554D77]">{t("Successful payment")}!</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-between px-1">
                <div className="flex flex-col items-center justify-center">
                  {Boolean(paymentError) ? (
                    <Image src={RechazedIcon} alt="Declined" width={60} height={60} />
                  ) : (
                    <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                  )}
                </div>
                <div className="mt-8">
                  {hasToRegister &&
                    (isRegisteredUser ? (
                      <div className="flex items-center">
                        <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                        <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Registering User")}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                        <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Registering User")}</span>
                      </div>
                    ))}
                  {hastoBuyNFT && (
                    <>
                      {isApprovedBuyNFT ? (
                        <div className="flex items-center mt-2">
                          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving NFT Amount")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Approving NFT Amount")}</span>
                        </div>
                      )}
                      {isBoughtNft ? (
                        <div className="flex items-center mt-2">
                          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Paying NFT")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Paying NFT")}</span>
                        </div>
                      )}
                    </>
                  )}
                  {hasToBuyMembership && (
                    <>
                      {isApprovedBuyMembership ? (
                        <div className="flex items-center mt-2">
                          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Membership Amount")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Approving Membership Amount")}</span>
                        </div>
                      )}
                      {isBoughtMembership ? (
                        <div className="flex items-center mt-2">
                          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Paying Membership")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Paying Membership")}</span>
                        </div>
                      )}
                    </>
                  )}
                  {hasToStake && (
                    <>
                      {isApprovedStaking ? (
                        <div className="flex items-center mt-2">
                          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Stake Amount")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Approving Stake Amount")}</span>
                        </div>
                      )}
                      {isStaked ? (
                        <div className="flex items-center mt-2">
                          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Staking")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Staking")}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <p className="mt-8 text-[14px] text-[#FF4C5A] text-center font-bold">{paymentError || t("Do not refresh or close this page")}!</p>
              </div>
            ))}
        </ModalComponent>
        {Boolean(toastedError) && <ToastContainer />}
      </div>
    </div>
  );
};

export default TotalPayment;
