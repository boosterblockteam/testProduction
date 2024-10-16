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
import ModalComponent from "@/app/components/generals/ModalComponent";
import CoffeeModal from "@/assets/imgs/coffee-dashboard.png";
import Image from "next/image";

interface Props {
  isDashboard?: boolean;
  dataHistory: DataHistory[];
}

const Dashboard = ({ isDashboard, dataHistory }: Props) => {
  const t = useTranslations();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Verificar si el modal ya se ha mostrado antes
    const hasModalBeenShown = localStorage.getItem("modalShown");

    if (!hasModalBeenShown) {
      // Si no se ha mostrado, abrir el modal
      setIsModalOpen(true);

      // Marcar el modal como mostrado en localStorage
      localStorage.setItem("modalShown", "true");

      // Cerrar el modal después de 5 segundos
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);

      // Limpiar el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, []);

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

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[240px] h-[280px] rounded-[20px] shadow-lg">
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <div>
            <Image src={CoffeeModal} alt="Coffee" width={132} height={132} className="object-cover" />
          </div>
          <p className="my-[20px] text-[16px] text-[#554D77] text-center font-bold">{t("We are setting up your account")}.</p>
          <p className="text-[14px] text-[#554D77] text-center">{t("This may take a few seconds")}.</p>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Dashboard;
