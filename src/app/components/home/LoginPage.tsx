"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoInitial from "@/assets/imgs/logoInitial.gif";
import { getSponsoAndLegSideFromUrl } from "@/utils/getSponsoAndLegSideFromUrl";

const LoginPage = () => {
  const router = useRouter();
  const [videoInitial, setVideoInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVideoInitial(false);
    }, 5000);

    setTimeout(() => {
      const { sponsor, legSide } = getSponsoAndLegSideFromUrl();
      router.push(`/welcome?sponsor=${sponsor}&legside=${legSide}`);
    }, 10000);
  }, []);

  return (
    <>
      {videoInitial ? (
        <div className="container-vide h-screen bg-[#1c1249]">
          <video autoPlay muted loop controls={false} playsInline className="w-full h-full">
            <source src="/videos/videoSinBorde.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="bg-[#1c1249] min-h-screen lg:max-w-[360px] mx-auto flex flex-col justify-between ">
          <div className="container-up-img"></div>
          <div className="mx-auto">
            <Image src={LogoInitial} alt="logo" width={56} height={50} />
          </div>
          <div className="container-down-img"></div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
