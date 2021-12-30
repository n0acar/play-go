import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import axios from "axios";
import ControlButtons from "../components/ControlButtons";
import AuthContext from "../contexts/AuthContext";
import Router from "next/router";

const Home: NextPage = () => {
  const [authItem, setAuthItem] = useContext(AuthContext);

  const refreshAccessToken = () => {
    const params = {
      refresh_token: authItem.refreshToken,
    };
    axios.get("/api/auth/refreshToken", { params }).then((response) => {
      setAuthItem({
        ...authItem,
        accessToken: response.data.access_token,
      });
      Router.push("/justplay");
    });
  };

  useEffect(() => {
    if (!authItem.isLoaded) return;
    if (authItem.refreshToken === "") {
      Router.push("/auth/authorize");
      return;
    }
    refreshAccessToken();
  }, [authItem]);
  return <div></div>;
};

export default Home;
