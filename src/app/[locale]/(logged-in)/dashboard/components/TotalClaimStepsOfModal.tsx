import Image from 'next/image';
import React from 'react'
import CirclePurple from "@/assets/icons/circle-purple-modal.svg";
import { useTranslations } from 'next-intl';

type Props = {
  isClaimedBonusNft: boolean;
  isClaimedDirectBonus: boolean;
}

const TotalClaimStepsOfModal = ({
  isClaimedBonusNft,
  isClaimedDirectBonus,
}: Props) => {

  const t = useTranslations();

  return (
    <div className="mt-8">
      {isClaimedBonusNft ? (
        <div className="flex items-center">
          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Processing your NFT Bonus Claim")}</span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Processing your NFT Bonus Claim")}</span>
        </div>
      )}
      {isClaimedDirectBonus ? (
        <div className="flex items-center">
          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Processing your Direct Bonus Claim")}</span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Processing your Direct Bonus Claim")}</span>
        </div>
      )}
    </div>
  )
}

export default TotalClaimStepsOfModal