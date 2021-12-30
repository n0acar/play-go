import React, { createContext, useState, useMemo } from "react";
import { useObjectStateWithLocalStorage } from "../utils/useStateWithLocalStorage";

interface AuthItem {
  accessToken: string;
  refreshToken: string;
  isLoaded: boolean;
}
const AuthContext = createContext<
  [AuthItem, React.Dispatch<React.SetStateAction<AuthItem>>]
>([
  {
    accessToken: "",
    refreshToken: "",
    isLoaded: false,
  },
  () => {},
]);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //TODO: isLoaded system can be improved
  const [authItem, setAuthItem] = useObjectStateWithLocalStorage<AuthItem>(
    "auth_item",
    {
      accessToken: "",
      refreshToken: "",
      isLoaded: false,
    }
  );

  const authProviderValue = useMemo(
    () =>
      [authItem, setAuthItem] as [
        AuthItem,
        React.Dispatch<React.SetStateAction<AuthItem>>
      ],
    [authItem, setAuthItem]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
