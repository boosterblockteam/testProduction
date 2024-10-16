"use client";
import React, { useEffect, useState } from "react";
import ModalComponent from "@/app/components/generals/ModalComponent";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import SelectedButton from "./SelectButton";
import { useClickOutside } from "@/utils/useClickOutside";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";
import { membershipContract } from "@/app/components/web3/contracts/membership.contract";
import { client } from "@/app/components/web3/client";
import { readContract } from "thirdweb";
import { useBalance } from "@/app/components/web3/hooks/useBalance";
import { formatCurrencyInteger } from "@/utils/formatCurrency";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import { useStake } from "@/app/components/web3/hooks/useStake";
import { useUser } from "@/app/components/web3/context/UserProvider";
import { ServiceProvider } from "@/app/components/providers/service.provider";

type MembershipArray = {
  id: number;
  membershipId: number;
  title: string;
  totalStaked: bigint;
  minInvestment: bigint;
  maxInvestment: bigint;
};

const Stake = () => {
  const t = useTranslations();
  const account = useActiveAccount();
  useAutoConnect({
    client,
    onConnect: console.log,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpenSelectPlan, SetIsOpenSelectPlan] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>(t("Select Membership"));
  const [amount, setAmount] = useState<string>("");
  const [myMemberships, setMyMemberships] = useState<any[]>([]); // Cambiado a objeto para guardar info de cada membresía
  const [minMax, setMinMax] = useState<{ min: bigint; max: bigint }>({ min: BigInt(0), max: BigInt(0) });
  const [totalStaked, setTotalStaked] = useState<any>(0); // Guardar el total staked de la membresía seleccionada
  const [memberId, setMemberId] = useState<any>();
  const [membershipId, setMembershipId] = useState<number>(0);
  const [avalaibleStake, setAvalaibleStake] = useState<any>();
  const [isApprovedStaking, setIsApprovedStaking] = useState(false);
  const [isStaked, setIsStaked] = useState(false);
  const [error, setError] = useState("");
  const { stake, approveStaking } = useStake();
  const { balance } = useBalance();
  const { user } = useUser();

  function handleOpenSelectMember() {
    SetIsOpenSelectPlan(!isOpenSelectPlan);
  }

  useClickOutside("#select-plan", () => SetIsOpenSelectPlan(!selectedPlan));

  const buttonApproveContract = async () => {
    const { membershipService } = ServiceProvider.getInstance().getServices();
    setError("");

    const minAmount = Number(minMax.min) / 1_000_000;
    const maxAmount = Number(minMax.max) / 1_000_000;

    console.log({ minAmount, maxAmount, amount });

    if (Number(amount) < minAmount) {
      setError(t("Amount must be equal or greater than", { minAmount: minAmount }));
      return;
    }

    if (Number(amount) > maxAmount) {
      setError(t("Amount must be equal or less than", { maxAmount: maxAmount }));
      return;
    }

    setIsModalOpen(true);
    setIsProcessing(true);

    setIsStaked(false);

    console.log({membershipId, memberId})

    const { membership } = await membershipService.getMembership(membershipId);
    const fee = (Number(amount) * membership.fee) / 100;

    const { errors: errorsApproveStaking } = await approveStaking(Number(amount) + fee);
    if (errorsApproveStaking) {
      console.log(errorsApproveStaking);
      setIsProcessing(false);
      setIsDeclined(true);
      return;
    }
    setIsApprovedStaking(true);

    const { errors: errorsStaking } = await stake({
      amount: Number(amount),
      memberId: Number(memberId),
    });
    if (errorsStaking) {
      console.log(errorsStaking);
      setIsProcessing(false);
      setIsDeclined(true);
      return;
    }
    setIsStaked(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    getInfo();

    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsModalOpen(false);
    setAmount("")
  };

  const getInfo = async () => {
    console.log("INFO");
    console.log(account);
    if (!account || !user?.selectedAccount) {
      return { errors: { message: t("Please connect your wallet") } };
    }

    let index = 0;
    let keepIterating = true;
    let membershipsArray: MembershipArray[] = [];

    while (keepIterating) {
      try {
        const membershipOfUsers = await readContract({
          contract: membershipContract,
          method: "membershipOfUsers",
          params: [BigInt(user.selectedAccount.idAccount), BigInt(index)], //EN VES DE 12 DEBERIA IR EL ID DEL NFT
        });
        const memberships = await readContract({
          contract: membershipContract,
          method: "memberships",
          params: [membershipOfUsers[0]],
        });

        console.log(`INFORMACION en index ${index}:`, membershipOfUsers);
        console.log(`INFORMACION Membresia ${index}:`, memberships);

        membershipsArray.push({
          id: index,
          membershipId: Number(membershipOfUsers[0]),
          title: memberships[0],
          totalStaked: membershipOfUsers[3],
          minInvestment: memberships[7],
          maxInvestment: memberships[8],
        });

        index++;
      } catch (error) {
        console.log(`Error en el index ${index}, finalizando iteración`, error);
        keepIterating = false;
      }
    }

    setMyMemberships(membershipsArray); // Guardar la lista de membresías en el estado

    if (membershipsArray.length > 0) {
      handleSelectPlan(membershipsArray[0]); // Selecciona automáticamente la primera membresía
    }
  };

  const handleSelectPlan = (selected: MembershipArray) => {
    console.log(selected);
    setMemberId(selected.id);
    setMembershipId(selected.membershipId);
    setSelectedPlan(selected.title);
    setTotalStaked(selected.totalStaked);
    setMinMax({ min: selected.minInvestment, max: selected.maxInvestment });
    /*
    let maximoStake = 0;
    console.log(blanceUsdt)
    const totalStakedBigInt = BigInt(selected.totalStaked);
    const balanceUsdtBigInt = BigInt(Math.floor(blanceUsdt * 1000000)); // Multiplicar por 1M para igualar la escala a 6 decimales y convertir a BigInt
    
    console.log(selected.maxInvestment)
    console.log(balanceUsdtBigInt)

    if (balanceUsdtBigInt >= parseInt(selected.maxInvestment) / 1000000) {
      console.log("Blance mayor a maximo")
      maximoStake = Number(selected.maxInvestment - totalStakedBigInt) / 1000000; // Convertir de nuevo a número después de la operación
    } else {
      console.log("Balance menor a maximo")
      maximoStake = Number(balanceUsdtBigInt - totalStakedBigInt) / 1000000; // Convertir de nuevo a número después de la operación
    }
    

    console.log(maximoStake)
    setAvalaibleStake(maximoStake)
*/
  };

  useEffect(() => {
    getInfo();
  }, [account]);

  function closeModal() {
    setIsModalOpen(false);
    setIsProcessing(false);
    setIsDeclined(false);
  }

  return (
    <div className="min-h-[calc(100vh-127px)] flex flex-col justify-between">
      <div className="container-up m-6 ">
        <div className="container-purple py-6 px-12 rounded-[20px] shadow-md bg-[#7A2FF4] text-white text-center">
          <p className="text-[14px] mb-2">{t("Available to Stake")}</p>
          <p className="text-[24px] font-bold ">$ {`${isNaN(parseInt(totalStaked)) ? "0" : formatCurrencyInteger(balance)}`}</p>
        </div>
      </div>

      <div className="container-down mb-[64px] px-6 pt-6 pb-4 rounded-t-[40px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
        <div>
          <p className="text-[12px] text-[#F2F3F8] text-center mb-1">{t("Select the Membership you are staking in")}</p>
          <SelectedButton
            isOpenList={isOpenSelectPlan}
            filterBy={selectedPlan}
            listSelect={myMemberships.map((membership) => membership.title)} // Solo mostramos los títulos
            openAndClose={handleOpenSelectMember}
            selectedSingle={(title) => handleSelectPlan(myMemberships.find((m) => m.title === title))} // Asigna el seleccionado
            textView={t("Select Membership")}
            id="select-plan"
            selectId={selectedPlan}
          />
        </div>
        <div className="py-3 px-2 rounded-[12px] shadow-md bg-[#ffffff1a] text-white text-center mb-4">
          <span className="text-[14px]">{t("Total Staked")}</span>
          <span className="text-[18px] font-bold ml-8">
            $ {`${isNaN(parseInt(totalStaked)) ? "0" : formatCurrencyInteger(parseInt(totalStaked) / 1000000)}`}
          </span>{" "}
          {/* Total stakeado de la membresía seleccionada */}
        </div>
        <div className="container-Stake-amount text-white p-4 rounded-[16px] border border-solid border-[#AD98FF] bg-gradient-to-t from-[#0E0E33] to-[#39307B] shadow-md">
          <div className="mb-4 rounded-[10px] border border-solid border-[#ffffff1a] p-2">
            <p className="text-[14px] font-bold mb-4">{t("Amount")}</p>

            <div className="container-input relative">
              <input
                className="rounded-[10px] p-4 bg-[#ffffff1a] w-full"
                value={amount}
                onChange={(e) => {
                  setError("");
                  setAmount(e.target.value);
                }}
                placeholder="$ 0"
              />
              <button
                onClick={() => {
                  const maxAmount = Number(minMax.max) / 1_000_000;
                  if (maxAmount > balance) {
                    setAmount(balance.toString());
                  } else {
                    setAmount(maxAmount.toString());
                  }
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#A9AEB4]"
              >
                {t("MAX")}
              </button>
            </div>
            {error && <p className="textErrorInputDark">{error}</p>}
            <div className="flex justify-between items-center mt-2 mb-4">
              <p className="text-[10px] ">
                <b>{t("MIN")}.:</b> {`$${isNaN(Number(minMax.min)) ? "0" : Number(minMax.min) / 1000000}`}
              </p>

              <p className="text-[10px] ">
                <b>{t("MAX")}.:</b> {`$${isNaN(Number(minMax.max)) ? "0" : (Number(minMax.max) - Number(totalStaked)) / 1000000}`}
              </p>
            </div>
          </div>
          <div>
            <ButtonPrimary text={t("Stake")} onClickFn={buttonApproveContract} />

            <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
              {isDeclined && (
                <div className="container-icon-close cursor-pointer w-6 absolute top-3 right-3" onClick={() => closeModal()}>
                  <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
                </div>
              )}
              {isProcessing ? (
                <div className="w-full h-full flex flex-col items-center justify-center px-1">
                  <div className="flex flex-col items-center justify-center">
                    <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                    <p className="text-[14px] text-[#A9AEB4] mt-8 text-center">{t("Processing your Stake")}...</p>
                  </div>
                </div>
              ) : isDeclined ? (
                <div className="w-full h-full flex flex-col items-center justify-center px-1">
                  <div className="flex flex-col items-center justify-center">
                    <Image src={RechazedIcon} alt="Declined" width={60} height={60} />
                    <p className="text-[14px] text-[#A9AEB4] mt-8">{t("Failed Stake")}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <Image src={CheckDone} alt="Check done" width={60} height={60} />
                    <p className="text-[14px] text-[#A9AEB4] mt-8">{t("Successful Stake")}</p>
                  </div>
                </div>
              )}
            </ModalComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
