"use client";
import React from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import "./cardItemStyles.css";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";

interface Props {
  card: {
    id: number;
    title: string;
    icon: any;
    link: string;
    isActive: boolean;
  };
  setIsModalOpen: (value: boolean) => void;
}

const CardItem = ({ card, setIsModalOpen }: Props) => {
  const router = useRouter();

  const handleItemClick = (link: string) => {
    if (link) {
      router.push(link);
    } else {
      setIsModalOpen(true);
    }
  };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    // transition,
  };

  return (
    <div
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      key={card.id}
      className={`${
        card.link.length > 0 ? "opacity-1 hover:bg-gradient-to-t from-[#AD98FF] to-[#612DFE]" : "opacity-[0.5]"
      } menu-page-item cardItem flex flex-col justify-between mb-6 last:mb-6 py-6 px-4 w-[112px] h-[55px] rounded-[16px] border border-solid border-[#7a2ff4] gradientPurpleLight `}
      onClick={() => handleItemClick(card.link)}
    >
      <div className="container-img rounded-[40px] bg-gradient-to-t from-[#ad98ff] to-[#612dfe] w-4 p-[6px] mx-auto">
        <Image src={card.icon} alt="icon" width={22} height={22} />
      </div>
      <span className="text-[16px] font-bold text-center mt-[6px] text-white">{card.title}</span>
    </div>
  );
};

export default CardItem;
