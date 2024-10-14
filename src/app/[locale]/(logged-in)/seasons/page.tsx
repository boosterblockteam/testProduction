import React from "react";
import Season from "./Season";
import { dataUserSeasons } from "./components/mockData";

const getData = async () => {
  const data = dataUserSeasons;
  return data;
};
const SeasonsPage = async () => {
  const dataUserSeasons = await getData();

  return (
    <>
      <Season dataUserSeasons={dataUserSeasons} />
    </>
  );
};

export default SeasonsPage;
