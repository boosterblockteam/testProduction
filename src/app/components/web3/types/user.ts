import { Account } from "@/app/[locale]/purchaseNft/types/account";
import { CreatePoi } from "./poi";

export type User = CreatePoi & {
  address: string;
  country: string;
  gender: string;
  dateOfBirth: string;
  imageLink: string;
  fbLink: string;
  igLink: string;
  youtubeLink: string;
  yTWelcomeLink: string;
  tikTokLink: string;
  wspLink: string;
  bio: string;
  accounts: Account[];
  selectedAccount: Account | null;
}
