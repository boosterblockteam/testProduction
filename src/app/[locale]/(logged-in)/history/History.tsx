"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { dataHistoryMock } from "./moskData";
import ModalComponent from "@/app/components/generals/ModalComponent";
import DolarModal from "@/assets/imgs/dolarModalHistory.png";
import Image from "next/image";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import ArrowCircle from "@/assets/icons/arrowCircleHistoryModal.svg";
import Link from "next/link";
import IconArrow from "@/assets/icons/historyDropdown.svg";

interface DataHistory {
  id: number;
  type: string;
  date: string;
  time: string;
  amount: string;
  amountFee: string;
  status: string;
  perfomanceFee: number;
  total: string;
  hash: string;
  confirmation: number;
  block: string;
}

const History = ({ isDashboard }: any) => {
  const t = useTranslations();
  const router = useRouter();

  const [dataHistoryInicial, setDataHistoryInicial] = useState<DataHistory[]>(dataHistoryMock);
  const [dataHistoryFiltered, setDataHistoryFiltered] = useState<DataHistory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historySelected, setHistorySelected] = useState<DataHistory | null>(null);

  const listToDisplay = [
    {
      keyStatic: "All Transactions",
      keyTranslate: t("All Transactions"),
    },
    {
      keyStatic: "Claim",
      keyTranslate: t("Claim"),
    },
    {
      keyStatic: "Stake",
      keyTranslate: t("Stake"),
    },
    {
      keyStatic: "Un-Stake",
      keyTranslate: t("Un-Stake"),
    },
    {
      keyStatic: "Profit",
      keyTranslate: t("Profit"),
    },
  ];

  const listToDisplayWithOutAllTransactions = [
    {
      keyStatic: "Claim",
      keyTranslate: t("Claim"),
    },
    {
      keyStatic: "Stake",
      keyTranslate: t("Stake"),
    },
    {
      keyStatic: "Un-Stake",
      keyTranslate: t("Un-Stake"),
    },
    {
      keyStatic: "Profit",
      keyTranslate: t("Profit"),
    },
  ];

  const [typeTransaction, setTypeTransaction] = useState(listToDisplayWithOutAllTransactions);
  const [isOpenTypeTransaction, setIsOpenTypeTransaction] = useState(false);
  const submenuRef = useRef(null);

  const NUMBER_BY_PAGE = 10;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: dataHistoryInicial,
    numberByPage: NUMBER_BY_PAGE,
  });

  const getElementsToShow = () => {
    if (!isDashboard) {
      return elemetsVisibleByPage;
    } else {
      return elemetsVisibleByPage.filter((_, index) => index < 4);
    }
  };

  useEffect(() => {
    let filterAccumulator: DataHistory[] = [];

    if (typeTransaction.length === 4) {
      filterAccumulator = dataHistoryInicial;
    }
    const auxTypeTransactions = typeTransaction.map((transaction) => transaction.keyStatic);
    filterAccumulator = dataHistoryInicial?.filter((item) => auxTypeTransactions.includes(item.type));

    setDataHistoryFiltered(filterAccumulator);
  }, [typeTransaction, dataHistoryInicial]);

  const handleButtonMoreDetails = (historySelect: DataHistory) => {
    console.log(historySelect);
    setHistorySelected(historySelect);
    setIsModalOpen(true);
  };

  function selectTypeOptionsTrans(_typeTransaction) {
    if (_typeTransaction === "All Transactions") {
      if (typeTransaction.length === 4) setTypeTransaction([]);
      else setTypeTransaction(listToDisplayWithOutAllTransactions);
      return;
    }

    if (typeTransaction.some((item) => item.keyStatic === _typeTransaction) && _typeTransaction !== "All Transactions") {
      setTypeTransaction(typeTransaction.filter((item) => item.keyStatic !== _typeTransaction));
    } else {
      const selectedTypeTrans = listToDisplayWithOutAllTransactions.find((item) => item.keyStatic === _typeTransaction);
      if (selectedTypeTrans) {
        setTypeTransaction([...typeTransaction, selectedTypeTrans]);
      }
    }
  }

  return (
    <>
      {!isDashboard ? <HeaderPages text={t("History")} /> : null}

      <div className={`${isDashboard ? "mx-6 p-2 rounded-[16px] bg-white h-[265px]" : "px-[24px] min-h-[calc(100vh-200px)]"}`}>
        {isDashboard ? (
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <h1 className="text-[20px] text-[#1E0E39]  font-bold">{t("History")}</h1>
              <div>
                <button
                  onClick={() => router.push("/history")}
                  className="text-[12px] text-white font-bold px-2 py-1 rounded-lg bg-gradient-to-t from-[#AD98FF] to-[#612DFE]"
                >
                  {t("See More")}
                </button>
              </div>
            </div>
            <p className="text-[#1E0E39] mt-2 text-[14px] font-normal">{`Showing the last 4 transactions`}</p>
          </div>
        ) : (
          <div
            className={`container-selectOpt mb-4 w-3/5 mx-auto bg-white rounded-t-[5px] text-[14px] text-[#1E0E39] p-2 relative border border-solid border-[#F2F3F8] cursor-pointer 
            ${isOpenTypeTransaction ? "rounded-b-0" : "rounded-b-[5px]"}`}
            ref={submenuRef}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                setIsOpenTypeTransaction(!isOpenTypeTransaction);
              }}
            >
              {t("All Transactions")}{" "}
              <div className={`ml-6 ${isOpenTypeTransaction ? "rotate-180" : ""}`}>
                <Image src={IconArrow} alt="flecha" width={10} height={10} />
              </div>
            </div>
            <div className={isOpenTypeTransaction ? "absolute z-30 bg-white w-full -left-0 top-7" : "hidden"}>
              {listToDisplay.map((graphs, index) => {
                return (
                  <label key={graphs.keyStatic} className="block ml-1 cursor-pointer border-b border-solid border-[#F2F3F8] py-2">
                    <input
                      className="w-[12px] h-[12px] mx-1 cursor-pointer"
                      type="checkbox"
                      checked={typeTransaction.length === 4 ? true : typeTransaction.map((item) => item.keyStatic).includes(graphs.keyStatic)}
                      onChange={() => {
                        selectTypeOptionsTrans(graphs.keyStatic);
                      }}
                    />
                    {graphs.keyTranslate}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {elemetsVisibleByPage.length > 0 ? (
          <div className={`${isDashboard ? "px-2 mt-[25px]" : "component-transactions"}`}>
            {getElementsToShow().map((history) =>
              isDashboard ? (
                <div key={history.id} className="flex justify-between items-center py-2 border-b border-solid border-[#F2F3F8] last:border-none">
                  <div className="container-type">
                    <p className="text-[#554D77] text-[14px] font-bold">{history.type}</p>
                    <span className="text-[#A9AEB4] text-[12px]">{history.date} </span>
                    <span className="text-[#A9AEB4] text-[12px]">{history.time}</span>
                  </div>
                  <div className="container-amount">
                    <p className="text-[#554D77] text-[14px] font-bold">$ {history.amount}</p>
                    <span className="text-[#A9AEB4] text-[12px]">
                      +${history.amountFee} {t("Fee")}
                    </span>
                  </div>
                </div>
              ) : (
                <div key={history.id} className="container-map flex flex-col items-center">
                  <div className="p-1 rounded-[100px] border border-solid border-[#ffffff1a] w-4/5 flex justify-between items-center mx-auto mb-1">
                    <div className="py-[2px] px-2 rounded-[20px] border border-solid border-[#ffffff1a]">
                      <p className="text-white font-bold text-[10px] text-center">
                        {t("ID")} {history.id}
                      </p>
                    </div>
                    <p className="text-white font-bold text-[14px]">{history.type}</p>
                    <div className="text-[#A9AEB4] text-[12px]">
                      <span>{history.date} </span>
                      <span>{history.time}</span>
                    </div>
                  </div>
                  <div className="my-2 w-full">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Status")}</p>
                      <p className="text-white text-[14px] ">Successful</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Amount")}</p>
                      <p className="text-white text-[14px] ">${history.amount}</p>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Performance Fee")}</p>
                      <p className="text-white text-[14px] ">${history.perfomanceFee}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Total")}</p>
                      <p className="text-white text-[14px] ">${history.total}</p>
                    </div>
                  </div>
                  <button className="text-[#20DABB] text-[12px] font-bold underline cursor-pointer" onClick={() => handleButtonMoreDetails(history)}>
                    {t("MORE DETAILS")}
                  </button>
                </div>
              )
            )}
            <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[320px] h-auto rounded-xl">
              <div className="container-modal">
                <div className="container-icon-close cursor-pointer w-6 float-right pt-2" onClick={() => setIsModalOpen(false)}>
                  <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
                </div>

                <div className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <Image src={DolarModal} alt="Dolar Image" width={50} height={50} />
                    <p className="my-2 text-[#1E0E39] text-[24px] font-bold">${historySelected?.amount}</p>
                    <p className="text-[#7A2FF4] text-[14px] font-bold">{historySelected?.type}</p>
                  </div>
                  <div className="my-2 w-full border-y border-solid border-[#EBECEF] py-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Status")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">{t("Successful")}</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Amount")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.amount}</p>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Performance Fee")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.perfomanceFee}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Total")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.total}</p>
                    </div>
                  </div>
                  <div className="mb-2 w-full border-b border-solid border-[#EBECEF] py-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Date and time")}</p>
                      <div className="text-[#1E0E39] text-[14px]">
                        <span>{historySelected?.date} </span>
                        <span>{historySelected?.time}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Hash")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.hash}</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Confirmation")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.confirmation}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Block")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.block}</p>
                    </div>
                  </div>
                  <Link href={`https://polygonscan.com/tx/${historySelected?.hash}`}>
                    <button className="text-[12px] font-bold text-[#7A2FF4] underline mx-auto flex items-center">
                      Polygon Scan <Image src={ArrowCircle} alt="Arrow Circle" width={18} height={18} className="ml-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </ModalComponent>
          </div>
        ) : (
          <h1 className="text-[#1E0E39] font-bold text-[18px] text-center">{t("No history data")}</h1>
        )}

        {!isDashboard ? (
          <div className="flex justify-center mt-5 ">
            <Pagination
              currentPage={currentPage}
              goToNextPage={goToNextPage}
              goToPage={goToPage}
              goToPreviousPage={goToPreviousPage}
              totalPages={totalPages}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default History;
