"use client";
import React from "react";
import { InfoUserNfts } from "./mockData";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./myNftsSwiperStyles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Card from "./Card";

interface Props {
  dataInfoUserNfts: InfoUserNfts[];
}

const CardsSwiper = ({ dataInfoUserNfts,infoNfts }: any) => {
  const chunkedAccounts = infoNfts.reduce((resultArray: InfoUserNfts[][], item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper h-[315px]"
      >
        {chunkedAccounts.map((chunk, chunkIndex) => (
          <SwiperSlide key={chunkIndex}>
            <div className="grid grid-cols-2 gap-x-1 justify-items-center h-[280px] max-w-[360px] mx-auto text-center">
              {chunk.map((user, index) => (
                <Card user={user} key={index} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardsSwiper;
