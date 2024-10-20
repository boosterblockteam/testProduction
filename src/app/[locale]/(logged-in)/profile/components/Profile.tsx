"use client";

import React from "react";
import DataPersonalUser from "./DataPersonalUser";
import DataRedesAndCurrentNFT from "./DataRedesAndCurrentNFT";
import DataBioWallet from "./DataBioWallet";
import Navbar from "@/app/components/generals/Navbar";
import ProfileHeader from "./ProfileHeader";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./profileSwiperStyles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Profile = () => {
  return (
    <div className="pb-[75px] min-h-screen bg-[#F2F3F8] pt-[240px]">
      <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] px-6 py-4 rounded-b-[40px] fixed top-0 z-50 w-full lg:max-w-[360px] lg:mx-auto">
        <Navbar text="Profile" />
        <ProfileHeader />
      </div>
      <div className="profile mx-6 mt-4 h-full relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Pagination, Navigation]}
          className="mySwiper rounded-[16px] h-[455px] flex items-center"
        >
          <SwiperSlide>
            <DataRedesAndCurrentNFT />
          </SwiperSlide>
          <SwiperSlide>
            <DataPersonalUser />
          </SwiperSlide>
          <SwiperSlide>
            <DataBioWallet />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Profile;
