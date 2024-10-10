import NFTImag1 from "@/assets/imgs/nfts/arte/1-100/1.png";
import NFTImag2 from "@/assets/imgs/nfts/arte/1-100/2.png";
import NFTImag3 from "@/assets/imgs/nfts/arte/1-100/3.png";
import NFTImag4 from "@/assets/imgs/nfts/arte/1-100/4.png";
import NFTImag5 from "@/assets/imgs/nfts/arte/1-100/5.png";
import NFTImag6 from "@/assets/imgs/nfts/arte/1-100/6.png";

export interface InfoUserNfts {
    nameAccount: string;
    idAccount: number;
    imageNft: string;
    levelCurrent: string;
    sponsorNFT: {
        id: number;
        name: string;
    };
    walletAddress: string;
    level: number;
    accountType: string;
    memberships: string;
    stakes: string;
    directsVolume: {
        count: number;
        amount: number;
    };
    globalVolume: {
        count: number;
        amount: number;
    };
    referralLink: string;
}

export const infoUserNfts = [
    {
      nameAccount: "DeFilyMaster",
      idAccount: 1,
      imageNft: NFTImag1,
      levelCurrent: "SAPPHIRE",
      sponsorNFT: {
        id: 1,
        name: "DeFily"
      },
      walletAddress: "0x23c432...d859cf",
      level: 1,
      accountType: "Own",
      memberships: "Active",
      stakes: "Active",
      directsVolume: {
        count: 3,
        amount: 2500
      },
      globalVolume: {
        count: 9,
        amount: 5000
      },
      referralLink: "https://example.com/ref/DeFilyMaster"
    },
    {
        nameAccount: "DeFilyMaster",
        idAccount: 2,
        imageNft: NFTImag2,
        levelCurrent: "SAPPHIRE",
        sponsorNFT: {
            id: 1,
            name: "DrParwiz"
          },
        walletAddress: "0x23c432...d859cf",
        level: 1,
        accountType: "Own",
        memberships: "Active",
        stakes: "Active",
        directsVolume: {
          count: 3,
          amount: 2500
        },
        globalVolume: {
          count: 9,
          amount: 5000
        },
        referralLink: "https://example.com/ref/DeFilyMaster"
      },
      {
        nameAccount: "DeFilyMaster",
        idAccount: 3,
        imageNft: NFTImag3,
        levelCurrent: "SAPPHIRE",
        sponsorNFT: {
          id: 1,
          name: "DeFily"
        },
        walletAddress: "0x23c432...d859cf",
        level: 1,
        accountType: "Own",
        memberships: "Active",
        stakes: "Active",
        directsVolume: {
          count: 3,
          amount: 2500
        },
        globalVolume: {
          count: 9,
          amount: 5000
        },
        referralLink: "https://example.com/ref/DeFilyMaster"
      },
      {
        nameAccount: "DeFilyMaster",
        idAccount: 4,
        imageNft: NFTImag4,
        levelCurrent: "SAPPHIRE",
        sponsorNFT: {
          id: 1,
          name: "DrParwiz"
        },
        walletAddress: "0x23c432...d859cf",
        level: 1,
        accountType: "Own",
        memberships: "Active",
        stakes: "Active",
        directsVolume: {
          count: 3,
          amount: 2500
        },
        globalVolume: {
          count: 9,
          amount: 5000
        },
        referralLink: "https://example.com/ref/DeFilyMaster"
      },
      {
        nameAccount: "DeFilyMaster",
        idAccount: 5,
        imageNft: NFTImag5,
        levelCurrent: "SAPPHIRE",
        sponsorNFT: {
          id: 1,
          name: "DeFily"
        },
        walletAddress: "0x23c432...d859cf",
        level: 1,
        accountType: "Own",
        memberships: "Active",
        stakes: "Active",
        directsVolume: {
          count: 3,
          amount: 2500
        },
        globalVolume: {
          count: 9,
          amount: 5000
        },
        referralLink: "https://example.com/ref/DeFilyMaster"
      },
      {
        nameAccount: "DeFilyMaster",
        idAccount: 6,
        imageNft: NFTImag6,
        levelCurrent: "SAPPHIRE",
        sponsorNFT: {
          id: 1,
          name: "DeFily"
        },
        walletAddress: "0x23c432...d859cf",
        level: 1,
        accountType: "Own",
        memberships: "Active",
        stakes: "Active",
        directsVolume: {
          count: 3,
          amount: 2500
        },
        globalVolume: {
          count: 9,
          amount: 5000
        },
        referralLink: "https://example.com/ref/DeFilyMaster"
      },
  ];