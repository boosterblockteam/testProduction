"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import EditIcon from "@/assets/icons/Edit.svg";
import Image from "next/image";
import { useUser } from "@/app/components/web3/context/UserProvider";

const DataPersonalUser = () => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useUser();

  const [infoUser, setInfoUser] = useState([
    {
      nameLabel: t("Email Address"),
      valueInput: user.email,
    },
    {
      nameLabel: t("Full Name"),
      valueInput: user.fullName,
    },
    {
      nameLabel: t("Phone Number"),
      valueInput: user.phone,
    },
    {
      nameLabel: t("Country"),
      valueInput: user.country,
    },
    {
      nameLabel: t("Gender"),
      valueInput: user.gender,
    },
    {
      nameLabel: t("Date of Birth"),
      valueInput: user.dateOfBirth,
    },
  ]);

  useEffect(() => {
    setInfoUser([
      {
        nameLabel: t("Email Address"),
        valueInput: user.email,
      },
      {
        nameLabel: t("Full Name"),
        valueInput: user.fullName,
      },
      {
        nameLabel: t("Phone Number"),
        valueInput: user.phone,
      },
      {
        nameLabel: t("Country"),
        valueInput: user.country,
      },
      {
        nameLabel: t("Gender"),
        valueInput: user.gender || t(user.gender),
      },
      {
        nameLabel: t("Date of Birth"),
        valueInput: user.dateOfBirth,
      },
    ]);
  }, [user]);

  return (
    <>
      <div className="container-form">
        <div
          className="container-img-edi p-2 rounded-[20px] bg-gradient-to-t from-[#AD98FF] to-[#612DFE] w-4 h-4 absolute -top-[0px] -right-[0px] z-50 cursor-pointer"
          onClick={() => router.push(`/profile/edit`)}
        >
          <Image src={EditIcon} alt="edit" width={18} height={18} />
        </div>
        {infoUser.length > 0 ? (
          infoUser.map((item, index) => (
            <div className="container-info" key={index}>
              <p className="labe text-[#A9AEB4] text-[14px] font-bold mb-[2px]">{item.nameLabel}</p>
              <p className="valu flex items-center py-1 px-4 text-[#554D77] text-[14px] rounded-[10px] h-[30px] border border-solid border-[#F2F3F8]">
                {item.valueInput}
              </p>
            </div>
          ))
        ) : (
          <>{t("Loading")}... </>
        )}
      </div>
    </>
  );
};

export default DataPersonalUser;
