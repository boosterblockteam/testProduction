"use client";
import React, { useEffect, useState } from "react";
import RewardPoolIcon from "@/assets/icons/RewardPoolIcon.svg";
import TransactionsIcon from "@/assets/icons/transationsIcon.svg";
import ClaimIcon from "@/assets/icons/claimIconMenu.svg";
import MyTeamIcon from "@/assets/icons/myTeamIcon.svg";
import MembershipIcon from "@/assets/icons/membreshipIcon.svg";
import RankingIcon from "@/assets/icons/rankingIcon.svg";
import HistoryIcon from "@/assets/icons/historyIcon.svg";
import MyAccountsIcon from "@/assets/icons/myAccountMenu.svg";
import GovernanceIcon from "@/assets/icons/governanceIcon.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import RelojGif from "@/assets/imgs/reloj-de-bolsillo.gif";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import OperationsIcon from "@/assets/icons/OperationsMenuIcon.svg";
import MarketingIcon from "@/assets/icons/MarketingIcon.svg";
import ToolsIcon from "@/assets/icons/Tools.svg";
import SeasonsIcon from "@/assets/icons/seasonsMenu.svg";
import CharityIcon from "@/assets/icons/charityMenu.svg";
import SettingsIcon from "@/assets/icons/settingsMenu.svg";
import ProfileIcon from "@/assets/icons/profileMenu.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./menuSwiperStyles.css";
import { DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, rectSwappingStrategy } from "@dnd-kit/sortable";
import CardItem from "./CardItem";
import Navbar from "@/app/components/generals/Navbar";

interface ListMenu {
  id: number;
  title: string;
  icon: any;
  link: string;
  isActive: boolean;
}

const DraggableMenu: React.FC = () => {
  const t = useTranslations();

  const initialListMenu: ListMenu[] = [
    { id: 1, title: t("My NFTs"), icon: MyAccountsIcon, link: `my-nfts`, isActive: true },
    { id: 2, title: t("My Team"), icon: MyTeamIcon, link: `myTeam`, isActive: true },
    { id: 3, title: t("Claims"), icon: ClaimIcon, link: "", isActive: true },
    { id: 4, title: t("Membership"), icon: MembershipIcon, link: ``, isActive: true },
    { id: 5, title: t("Rewards"), icon: RewardPoolIcon, link: "", isActive: true },
    { id: 6, title: t("Ranking"), icon: RankingIcon, link: "", isActive: true },
    { id: 7, title: t("History"), icon: HistoryIcon, link: "", isActive: true },
    { id: 8, title: t("Transactions"), icon: TransactionsIcon, link: "", isActive: true },
    { id: 9, title: t("Governance"), icon: GovernanceIcon, link: ``, isActive: true },
    { id: 10, title: t("Operations"), icon: OperationsIcon, link: ``, isActive: true },
    { id: 11, title: t("Marketing"), icon: MarketingIcon, link: ``, isActive: true },
    { id: 12, title: t("Tools"), icon: ToolsIcon, link: ``, isActive: true },
    { id: 13, title: t("Seasons"), icon: SeasonsIcon, link: ``, isActive: true },
    { id: 14, title: t("Charity"), icon: CharityIcon, link: ``, isActive: true },
    { id: 15, title: t("Settings"), icon: SettingsIcon, link: ``, isActive: true },
    { id: 16, title: t("Profile"), icon: ProfileIcon, link: `profile`, isActive: true },
  ];

  const [menuItems, setMenuItems] = useState<ListMenu[]>(initialListMenu);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chunkedOptionsMenu = menuItems.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 8);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as ListMenu[][]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];

        const oldItem = newItems[oldIndex];
        newItems[oldIndex] = newItems[newIndex];
        newItems[newIndex] = oldItem;
        localStorage.setItem("menuItems", JSON.stringify(newItems));
        return newItems;
      });
    }
  };

  useEffect(() => {
    const menuItemsStorage = localStorage.getItem("menuItems");
    if (menuItems && menuItemsStorage) {
      setMenuItems(JSON.parse(menuItemsStorage));
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
        delay: 250,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen pt-4">
      <div className="px-6">
        <Navbar text={t("Menu")} />
      </div>
      <div className="menu-page text-white px-6 pt-4 pb-[68px] min-h-[calc(100vh-117px)] flex items-center">
        <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={handleDragEnd}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper h-[525px]"
          >
            {chunkedOptionsMenu.map((chunk, chunkIndex) => (
              <SwiperSlide key={chunkIndex}>
                <SortableContext items={menuItems} strategy={rectSwappingStrategy}>
                  <div className="grid grid-cols-2 justify-items-center h-[515px] text-center">
                    {chunk.map((item) => (
                      <CardItem card={item} key={item.id} setIsModalOpen={setIsModalOpen} />
                    ))}
                  </div>
                </SortableContext>
              </SwiperSlide>
            ))}
          </Swiper>
        </DndContext>
      </div>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[240px] h-[240px] rounded-xl">
        <div className="container-modal">
          <div className="container-icon-close cursor-pointer w-6 float-right pt-2" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <Image src={RelojGif} alt="Reloj" width={132} height={132} />
            <p className="text-center text-[18px] font-bold text-[#A9AEB4] italic mt-[20px]">{t("Coming soon")}!</p>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default DraggableMenu;
