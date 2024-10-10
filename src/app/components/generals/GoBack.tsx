"use client";
import GoBackSVG from "@/assets/icons/GoBackIcon";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  text: string;
  linkRouter: string;
}

const GoBack = ({ text, linkRouter }: Props) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(linkRouter)} className="flex items-center cursor-pointer">
      {linkRouter ? <GoBackSVG width={20} height={20} /> : null}

      <h2 className="text-white text-[16px] font-bold">{text}</h2>
    </div>
  );
};

export default GoBack;
