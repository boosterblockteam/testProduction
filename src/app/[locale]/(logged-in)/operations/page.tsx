import React from "react";
import Operations from "./Operations";
import { profitHistoryOperations } from "./components/mockData";

const getDataOperations = async () => {
  const profitHistory = profitHistoryOperations;
  return profitHistory;
};

const OperationsPage = async () => {
  const dataOperationsHistory = await getDataOperations();

  return (
    <>
      <Operations dataOperationsHistory={dataOperationsHistory} />
    </>
  );
};

export default OperationsPage;
