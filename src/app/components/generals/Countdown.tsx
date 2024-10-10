"use client";
import { getTimeDifference } from "@/app/[locale]/(logged-in)/myTeam/utils/get-time-difference";
import { addSeconds } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  nowDate: Date | null;
  endDate: Date;
  bgColor?: string;
  classname?: string;
  classDate?: string;
};

const Countdown = ({ nowDate, endDate, bgColor, classname, classDate }: Props) => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);
  const [leftTime, setLeftTime] = useState({
    now: new Date(),
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!nowDate) {
      return;
    }
    setLeftTime(l => ({ ...l, now: nowDate }));
    setIsLoading(false);
  }, [nowDate]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    let incrementSecondInterval = setInterval(() => {
      setLeftTime(prevLeftTime => {

        const newNow = addSeconds(prevLeftTime.now, 1);

        const { days, hours, minutes, seconds } = getTimeDifference(new Date(newNow), endDate);

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(incrementSecondInterval);
          return prevLeftTime;
        }

        return {
          now: newNow,
          days,
          hours,
          minutes,
          seconds,
        }
        
      });
    }, 1000);
    
    return () => clearInterval(incrementSecondInterval);
  }, [isLoading]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const distance = dateEnd.getTime() - new Date().getTime();
  //     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     if (distance < 0) {
  //       clearInterval(interval);
  //     }
  //     setDays(days);
  //     setHours(hours);
  //     setMinutes(minutes);
  //     setSeconds(seconds);
  //     // console.log({ days, hours, minutes, seconds });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [dateEnd]);

  return (
    <div
      className={`duration-1000 transition ${bgColor ? bgColor : "bg-[#12C2E9]"} ${
        classname ? classname : "container-countdown mt-1 flex justify-between items-center rounded-[6px] text-white item-body  py-1 px-4"
      }`}
    >
      <div className="text-center mr-1">
        <p className={`fecha ${classDate ? classDate : "text-[12px]"}`}>{leftTime.days}</p>
        <p className="hora text-[6px]">{t("DAYS")}</p>
      </div>
      <div className="text-center mr-1">
        <p className={`fecha ${classDate ? classDate : "text-[12px]"}`}>{leftTime.hours}</p>
        <p className="hora text-[6px]">HS</p>
      </div>
      <div className="text-center mr-1">
        <p className={`fecha ${classDate ? classDate : "text-[12px]"}`}>{leftTime.minutes}</p>
        <p className="hora text-[6px]">MN</p>
      </div>
      <div className="text-center">
        <p className={`fecha ${classDate ? classDate : "text-[12px]"}`}>{leftTime.seconds}</p>
        <p className="hora text-[6px]">SEC</p>
      </div>
    </div>
  );
};

export default Countdown;
