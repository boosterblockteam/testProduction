"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";
import { useGetPoi } from "../hooks/useGetPoi";
import { client } from "../client";
import { User } from "../types/user";
import { ServiceProvider } from "../../providers/service.provider";

export type UserContext = {
  user: User;
  isLoadingUser: boolean;
  reloadUser: () => Promise<void>;
}

const initialUser: User = {
  address: "",
  email: "",
  fullName: "",
  username: "",
  phone: "",
  country: "",
  gender: "",
  dateOfBirth: "",
  imageLink: "",
  fbLink: "",
  igLink: "",
  youtubeLink: "",
  yTWelcomeLink: "",
  tikTokLink: "",
  wspLink: "",
  bio: "",
  accounts: [],
  selectedAccount: null,
}

const UserContext = createContext<UserContext>({
  user: initialUser,
  isLoadingUser: true,
  reloadUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }: PropsWithChildren) {

  const [user, setUser] = useState<User>(initialUser);

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  // Este hook depende de un ConnectButon o de useAutoConnect para traer datos de la wallet
  const account = useActiveAccount();

  // (NO ELIMNIAR) Este hook fuerza a los hooks useActiveAccount a actualizar el estado de account cuando se carga la página
  useAutoConnect({
    client,
    onConnect: console.log,
  });

  const { poi, isLoading: isLoadingPoi, loadPoi } = useGetPoi();

  useEffect(() => {
    
    if (poi && account) {
      setUser(user => ({
        ...user,
        email: poi.email,
        fullName: poi.fullName,
        username: poi.username,
        phone: poi.phone,
        country: poi.country,
        gender: poi.gender,
        dateOfBirth: poi.dateOfBirth,
        imageLink: poi.imageLink,
        fbLink: poi.fbLink,
        igLink: poi.igLink,
        youtubeLink: poi.youtubeLink,
        yTWelcomeLink: poi.yTWelcomeLink,
        tikTokLink: poi.tikTokLink,
        wspLink: poi.wspLink,
        bio: poi.bio,
        address: account.address,
      }));
    }

  }, [poi, account]);

  useEffect(() => {
    loadAccounts();
  }, [account]);

  useEffect(() => {
    setIsLoadingUser(isLoadingPoi || isLoadingAccounts);
  }, [isLoadingPoi, isLoadingAccounts]);

  const loadAccounts = async () => {
    if (account) {

      setIsLoadingAccounts(true);
      
      const { accountService } = ServiceProvider.getInstance().getServices();

      try {
        const { accounts } = await accountService.getAccounts(account.address);

        setUser(user => ({
          ...user,
          accounts,
        }));

        const { account: selectedAccount } = await accountService.getSelectedAccount(account.address);

        setUser(user => ({
          ...user,
          selectedAccount,
        }));

      } catch (error) {
        console.log(error);
      }

      setIsLoadingAccounts(false);
      
    }
  }

  const reloadUser = async () => {
    loadPoi();
    await loadAccounts();
  }

  return (
    <UserContext.Provider value={{ user, isLoadingUser, reloadUser }}>
      {children}
    </UserContext.Provider>
  );

}
