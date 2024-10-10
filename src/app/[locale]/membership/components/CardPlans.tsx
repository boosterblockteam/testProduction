"use client";
import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./cardPlansStyles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

import CardPlanData from "./CardPlanData";
import { usePathname } from "next/navigation";
import { Membership } from "../types/membership";
interface PlansMembership {
  plan: string;
  price: string;
  minStake: string;
  maxStake: string;
  fee: any;
  expiration: number;
  performanceFee: number;
}

interface Props {
  membershipsOptions: Membership[];
  setMembershipsOptions: React.Dispatch<React.SetStateAction<Membership[]>>;
  selectedPlan: Membership;
  setSelectedPlan: React.Dispatch<React.SetStateAction<Membership>>;
}

export default function CardPlans({ membershipsOptions, setMembershipsOptions, selectedPlan, setSelectedPlan }: Props) {
  const swiper = useSwiper();
  const swiperRef = useRef<any>(null);
  const pathname = usePathname();

  return (
    <div className={`px-[40px] relative w-full mt-4 min-h-[335px] `}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper min-w-[265px] w-[265px] absolute shadow-lg shadow-[#0000001f] rounded-[20px]"
      >
        {membershipsOptions.map((card, index) => (
          <SwiperSlide key={index} className="">
            <CardPlanData card={card} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
          </SwiperSlide>
        ))}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-[10px] top-1/2 transform -translate-y-1/2 z-50"
          aria-label="Previous plan"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 10 20" fill="none">
            <path d="M8.5 2.07129L1.5 10.0713L8.5 18.0713" stroke="#554D77" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-[10px] top-1/2 transform -translate-y-1/2 z-50"
          aria-label="Next plan"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 10 20" fill="none">
            <path d="M1.5 18.0713L8.5 10.0713L1.5 2.07129" stroke="#554D77" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Swiper>
    </div>
  );
}
