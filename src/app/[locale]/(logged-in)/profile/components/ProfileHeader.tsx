"use client";
import React from "react";
import ProfilePic from "./../components/ProfilePic";
import { useUser } from "@/app/components/web3/context/UserProvider";

const ProfileHeader = () => {

  const { user } = useUser();

  return (
    <div className="profile-header flex flex-col items-center">
      <div className="container-img-user">
        <ProfilePic />
      </div>
      <div className="container-info-user text-center">
        <h1 className="text-white text-[18px] font-bold mb-1">{user.fullName}</h1>
        <span className="text-white text-[14px]">@{user.username}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
