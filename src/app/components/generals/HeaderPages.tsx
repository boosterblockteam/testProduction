"use client";
import React, { useEffect, useState } from "react";
import ContainerLanguage from "./ContainerLanguage";
import NotificationsSVG from "@/assets/icons/NotificationsIcon";
import AccountSVG from "@/assets/icons/Door.svg";
import SupportSVG from "@/assets/icons/Support.svg";
import GoBack from "./GoBack";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type HeaderPagesProps = {
  text: string;
  linkRouter?: string;
};

const HeaderPages = ({ text, linkRouter }: HeaderPagesProps) => {
  const router = useRouter();

  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (wallet) {
      setWallet(wallet);
    }
  }, [wallet]);

  return (
    <div className="headerPage">
      <GoBack text={text} linkRouter={linkRouter || ``} />

      <div className="container-language-notifications">
        <Link href={`/accountLogin`} className="cursor-pointer">
          <Image src={AccountSVG} alt="icon" width={20} height={20} />
        </Link>
        <Link href={`/support`} className="cursor-pointer">
          <Image src={SupportSVG} alt="icon" width={20} height={20} />
        </Link>

        <ContainerLanguage />
        <NotificationsSVG fill="#fff" width={20} height={20} onClick={() => router.push("/notifications")} />
      </div>
    </div>
  );
};

export default HeaderPages;
