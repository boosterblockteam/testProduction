"use client";
import React, { useState } from "react";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useTranslations } from "next-intl";
import CardDetailsHz from "../components/CardDetailsHz";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./directUserSwiperStyles.css";

const DirectUsers = ({ dataUsersDirects }) => {
  const t = useTranslations();
  const [dataUserInitial, setDataUserInitial] = useState(dataUsersDirects);

  const chunkedListUsers = dataUserInitial.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 6);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen pb-[85px] ">
      <HeaderPages text={t("Direct Users")} linkRouter="/myTeam/nft-details" />

      <div className="px-6">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper h-[635px]"
        >
          {chunkedListUsers.map((chunk, chunkIndex) => (
            <SwiperSlide key={chunkIndex}>
              <div className=" h-full ">
                {chunk.map((item) => (
                  <CardDetailsHz key={item.id} infoUsers={item} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DirectUsers;
