import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  useObjectStateWithLocalStorage,
  useStateWithLocalStorage,
} from "../utils/useStateWithLocalStorage";
import axios from "axios";
import Router from "next/router";

interface AuthItem {
  accessToken: string;
  refreshToken: string;
}
const AuthContext = createContext<
  [AuthItem, React.Dispatch<React.SetStateAction<AuthItem>>]
>([
  {
    accessToken: "",
    refreshToken: "",
  },
  () => {},
]);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isStarted, setStarted] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [authItem, setAuthItem] = useState<AuthItem>({
    accessToken: "",
    refreshToken: "",
  });
  const [refreshToken, setRefreshToken] = useStateWithLocalStorage(
    "refresh_token",
    isLoaded,
    setLoaded
  );

  const [refreshRetry, setRefreshRetry] = useState(0);

  const authProviderValue = useMemo(
    () =>
      [authItem, setAuthItem] as [
        AuthItem,
        React.Dispatch<React.SetStateAction<AuthItem>>
      ],
    [authItem, setAuthItem]
  );

  const refreshAccessToken = (shouldRoute: boolean) => {
    const params = {
      refresh_token: refreshToken,
    };
    axios
      .get("/api/auth/refreshToken", { params })
      .then((response) => {
        setAuthItem({
          accessToken: response.data.access_token,
          refreshToken: refreshToken,
        });
        setStarted(true);
        if (shouldRoute) Router.push("/justplay");
        else setRefreshRetry(0);
      })
      .catch((error) => {
        console.error(error);
        if (shouldRoute) Router.push("/auth/authorize");
        else setRefreshRetry(refreshRetry + 1);
      });
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (refreshToken === "") {
      Router.push("/auth/authorize");
      return;
    }
    if (!isStarted) {
      console.log("efreess");
      refreshAccessToken(true);
    }
  }, [isLoaded, refreshToken]);

  useEffect(() => {
    if (!authItem) return;
    if (authItem.refreshToken != "") setRefreshToken(authItem.refreshToken);
  }, [authItem]);

  useEffect(() => {
    if (!isStarted) return;
    const refreshTimer = setInterval(
      (refreshRetry) => refreshAccessToken(refreshRetry == 2),
      15 * 60 * 1000
    );
    return () => {
      clearInterval(refreshTimer);
    };
  }, [isStarted]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
