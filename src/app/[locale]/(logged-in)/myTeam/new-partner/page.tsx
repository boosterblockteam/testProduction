import React from "react";
import Register from "@/app/[locale]/register/Register";

const getAllCountries = async () => {
  const listCountries = await fetch("https://restcountries.com/v3.1/all").then((res) => res.json());
  return listCountries;
};

const NewPartnerPage = async () => {
  const allCountries = await getAllCountries();

  return (
    <>
      <Register allCountries={allCountries} />
    </>
  );
};

export default NewPartnerPage;
