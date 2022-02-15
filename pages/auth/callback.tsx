import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useContext } from "react";
import querystring, { ParsedQuery } from "query-string";
import Router from "next/router";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

const Callback: NextPage = () => {
  const [authItem, setAuthItem] = useContext(AuthContext);

  useEffect(() => {
    const parsedUrlParams: ParsedQuery = querystring.parse(location.search);
    if (parsedUrlParams.error) {
      console.log("TODO");
    }
    const params: any = {
      code: parsedUrlParams.code,
      state: parsedUrlParams.state,
    };
    axios.get("/api/auth/callback", { params }).then((response) => {
      setAuthItem({
        ...authItem,
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
      Router.push("/justplay");
    });
  }, []);
  return (
    <div>
      <Head>Callbacking...</Head>
    </div>
  );
};

export default Callback;
