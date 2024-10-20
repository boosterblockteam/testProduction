"use client";
import React from "react";
import NotificationActive from "@/assets/icons/notificationsActive.svg";
import NotificationInActive from "@/assets/icons/notificationsInactive.svg";
import { MessagesNotifications } from "./moskData";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Navbar from "@/app/components/generals/Navbar";
import DontNotifications from "@/assets/icons/no-notifications.svg";

interface Props {
  messages: MessagesNotifications[];
}

const Notifications = ({ messages }: Props) => {
  const t = useTranslations();

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const today = new Date();
    const yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24);

    if (date.getTime() === today.getTime()) {
      return "Today";
    } else if (date.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return `${day}/${month}/${year}`;
    }
  };

  const addUniqueMessage = (messages: MessagesNotifications[], message: MessagesNotifications) => {
    if (!messages.some((m) => m.id === message.id)) {
      messages.push(message);
    }
    return messages;
  };

  const groupedMessages = messages.reduce((acc: any, message: MessagesNotifications) => {
    const date = formatDate(message.date);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date] = addUniqueMessage(acc[date], message);
    return acc;
  }, []);

  return (
    <div className="pt-[52px]">
      <div className="header-notifications rounded-b-[40px] px-6 py-4 bg-gradient-to-t from-[#0E0E33] to-[#39307B] fixed top-0 z-50 w-full lg:max-w-[360px] lg:mx-auto">
        <Navbar text={t("Notifications")} />
      </div>
      <div className="mx-6 mt-6 mb-24">
        {messages.length > 0 ? (
          Object.keys(groupedMessages).map((date) => (
            <div key={date} className="mb-6">
              <h2 className="text-[14px] font-bold text-[#A9AEB4]">{date}</h2>
              <div className="shadow-md rounded-[16px] mt-[16px]">
                {groupedMessages[date].map((message: MessagesNotifications) => (
                  <div key={message.id} className="p-4 flex items-center border-b border-solid border-[#F2F3F8]">
                    <div className={`p-2 w-[34px] rounded-full mr-4  ${message.isRead ? "bg-[#A9AEB4]" : "bg-[#20DABB]"}`}>
                      {message.isRead === false ? (
                        <Image src={NotificationActive} alt="notification" />
                      ) : (
                        <Image src={NotificationInActive} alt="notification" />
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#554D77] mb-2">{message.msg}</p>
                      <p>{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1 className="mb-4 text-[14px] font-bold text-[#A9AEB4]">{t("Today").toLocaleUpperCase()}</h1>
            <div className="p-4 rounded-[10px] bg-white shadow-md flex flex-col items-center">
              <Image src={DontNotifications} alt="notification" width={80} height={80} />
              <p className="text-[18px] font-bold text-[#554D77] text-center mt-4">{t("You currently have no notifications")}!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
