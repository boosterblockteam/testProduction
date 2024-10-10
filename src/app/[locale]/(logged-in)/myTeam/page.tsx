import React from "react";
import MyTeam from "./components/MyTeam";
import { dataLevelsMock } from "./components/moskData";

async function fetchServerDataMember() {
  const data = dataLevelsMock;

  return;
  data;
}

const MyTeamPage = async () => {
  const dataFech = await fetchServerDataMember();

  return (
    <>
      <MyTeam infoUserLevel={dataFech} type={""} />
    </>
  );
};

export default MyTeamPage;
