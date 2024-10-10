"use client";
import React, { useEffect, useState } from "react";
import History from "../../history/History";
import { DataHistory } from "../../history/moskData";
import { useTranslations } from "next-intl";
import DataStakesClaims from "./DataStakesClaims";
import Navbar from "@/app/components/generals/Navbar";
import ContainerWithChart from "./ContainerWithChart";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./dashboardSwiperStyles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

interface Props {
  isDashboard?: boolean;
  dataHistory: DataHistory[];
}

const Dashboard = ({ isDashboard, dataHistory }: Props) => {
  const t = useTranslations();

  return (
    <div className="bg-[#F2F3F8] pb-[64px] min-h-screen pt-[390px]">
      <div className="headerr rounded-b-[40px] px-6 py-4 bg-gradient-to-t from-[#0E0E33] to-[#39307B] fixed top-0 w-full z-50 lg:max-w-[360px] lg:mx-auto">
        <Navbar text={t("Dashboard")} />
        <DataStakesClaims />
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper rounded-[16px] mt-4 h-[300px] flex items-center"
      >
        <SwiperSlide>
          <ContainerWithChart />
        </SwiperSlide>
        <SwiperSlide>
          <History isDashboard={isDashboard} data={dataHistory} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Dashboard;
