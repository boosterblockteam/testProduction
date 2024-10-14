"use client";
import React from "react";
import CardSeason from "./components/CardSeason";
import { DataUserSeasons } from "./components/mockData";
import { useTranslations } from "next-intl";
import Navbar from "@/app/components/generals/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./seasonsSwiperStyles.css";

const Season = ({ dataUserSeasons }) => {
  const t = useTranslations();

  const chunkedSeasons = dataUserSeasons.reduce((resultArray: DataUserSeasons[][], item, index) => {
    const chunkIndex = Math.floor(index / 6);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen pb-[85px] px-6 pt-4">
        <Navbar text={t("Seasons")} />

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper h-[610px]"
        >
          {chunkedSeasons.map((chunk, chunkIndex) => (
            <SwiperSlide key={chunkIndex}>
              <div className=" h-full ">
                {chunk.map((item) => (
                  <CardSeason dataUserSeasons={item} key={item.id} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Season;
