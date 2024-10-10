import React from "react";
import MyNfts from "./MyNfts";
import { infoUserNfts } from "./components/mockData";

const getDataUser = async () => {
  const dataUser = infoUserNfts;
  return dataUser;
};

const MyNftsPage = async () => {
  const dataInfoUserNfts = await getDataUser();

  return (
    <>
      <MyNfts dataInfoUserNfts={dataInfoUserNfts} />
    </>
  );
};

export default MyNftsPage;
