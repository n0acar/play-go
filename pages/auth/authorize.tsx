import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import Router from "next/router";

const Authorize = () => {
  const [authItem, setAuthItem] = useContext(AuthContext);

  const authorize = () => {
    axios
      .get<string>("/api/auth/authorize")
      .then((response) => (window.location.href = response.data));
  };

  return (
    <div>
      <button onClick={authorize}>AUTHORIZE</button>
    </div>
  );
};

export default Authorize;
