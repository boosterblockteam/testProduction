"use client";
import React, { useEffect, useState } from "react";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import Image from "next/image";
import ContainerLanguage from "./ContainerLanguage";
import NotificationsSVG from "@/assets/icons/NotificationsIcon";
import AccountSVG from "@/assets/icons/DoorExit.svg";
import SupportSVG from "@/assets/icons/SupportNew.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../web3/context/UserProvider";
import InternetStatus from "./InternetStatus";

type Props = {
  text: string;
};

const Navbar = ({ text }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [accountName, setAccountName] = useState(`${"Loading"}...`);

  const { user } = useUser();

  useEffect(() => {
    if (user?.selectedAccount) {
      setAccountName(user.selectedAccount.accountName);
    }
  }, [user]);

  return (
    <div
      className={`navbar flex justify-between items-center  ${
        pathname === "/notifications" || pathname === "/claims" || pathname === "/rewards" ? "mb-0" : "mb-4"
      }`}
    >
      {pathname === "/dashboard" ? (
        <div className="container-log flex items-center">
          <Image src={LogoPeq} alt="logo" width={20} height={20} />
          <div className="ml-1">
            <h1 className="text-white text-[16px] font-bold">{text}</h1>
            <p className="text-white text-[10px]">{accountName}</p>
          </div>
        </div>
      ) : (
        <div className="container-log flex items-center">
          <h2 className="text-white text-[16px] font-bold">{text}</h2>
        </div>
      )}
      <div className={`container-language-notifications flex justify-between items-center w-36`}>
        <Link href={`/accountLogin`} className="cursor-pointer">
          <Image src={AccountSVG} alt="icon" width={20} height={20} />
        </Link>
        <Link href={`/support`} className="cursor-pointer">
          <Image src={SupportSVG} alt="icon" width={20} height={20} />
        </Link>
        <ContainerLanguage />
        <NotificationsSVG fill="#fff" width={20} height={20} className="cursor-pointer" onClick={() => router.push(`/notifications`)} />
        <InternetStatus />
      </div>
    </div>
  );
};

export default Navbar;
