import React from "react";
import DirectUsers from "./DirectUsers";
import { datosUsersRef } from "../components/moskData";

async function fetchServerDataUsers() {
  const data = datosUsersRef;
  return data;
}

const DirectUserPage = async () => {
  const dataUsersDirects = await fetchServerDataUsers();

  return (
    <>
      <DirectUsers dataUsersDirects={dataUsersDirects} />
    </>
  );
};

export default DirectUserPage;
