import React from "react";
import Claim from "./Claim";
import { dataOperationsClaim } from "./components/mockData";

async function getDataTransactions() {
  const dataClaimInfo = dataOperationsClaim;

  return dataClaimInfo;
}

const ClaimsPage = async () => {
  const dataClaim = await getDataTransactions();

  return (
    <>
      <Claim dataClaim={dataClaim} />
    </>
  );
};

export default ClaimsPage;
