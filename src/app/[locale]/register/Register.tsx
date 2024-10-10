"use client";
import RegisterOne from "./components/RegisterOne";
import HeaderRegister from "@/app/components/register/HeaderRegister";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  allCountries: string[];
};

export default function Register({ allCountries }: Props) {
  const pathname = usePathname();
  const [stepCompleted, setStepCompleted] = useState(1);

  const handleStep = (value: number) => {
    setStepCompleted(value);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const step = urlParams.get("step");
    console.log(step);
    // Convertir step a número
    const stepNumber = step ? parseInt(step, 10) : 1;
    setStepCompleted(stepNumber);
  }, []);

  return (
    <div className={`${pathname === "/register" ? "pt-[140px]" : "pt-[120px]"}`}>
      <HeaderRegister />
      <RegisterOne />
    </div>
  );
}
