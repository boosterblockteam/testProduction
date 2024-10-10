import React from "react";
import Stakes from "./Stakes";
import { profitHistoryMyLiquidity, infoMembership, dataOperationsUnStake } from "./components/MockData";

const getDataStakes = async () => {
  const profitHistory = profitHistoryMyLiquidity;
  const dataUnStake = dataOperationsUnStake;
  return {
    infoMembership,
    profitHistory,
    dataUnStake,
  };
};

const StakesPage = async () => {
  const { infoMembership, profitHistory, dataUnStake } = await getDataStakes();

  return (
    <>
      <Stakes dataMyStakes={profitHistory} infoMembership={infoMembership} dataUnStake={dataUnStake} />
    </>
  );
};

export default StakesPage;
