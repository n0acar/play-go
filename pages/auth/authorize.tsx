import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import Router from "next/router";

const authorize = () => {
  const [authItem, setAuthItem] = useContext(AuthContext);

  const authorize = () => {
    axios
      .get<string>("/api/auth/authorize")
      .then((response) => (window.location.href = response.data));
  };

  useEffect(() => {
    if (!authItem.isLoaded) return;
    if (authItem.refreshToken === "") {
      return;
    }
    Router.push("/");
  }, [authItem]);

  return (
    <div>
      <button onClick={authorize}>AUTHORIZE</button>
    </div>
  );
};

export default authorize;
