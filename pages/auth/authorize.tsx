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
    <div className="text-center min-h-screen flex items-center justify-center">
      <button
        className="outline outline-offset-4 bg-teal-100 rounded-2xl h-12 w-32 text-zinc-900 outline-teal-100 text-bold"
        onClick={authorize}
      >
        AUTHORIZE
      </button>
    </div>
  );
};

export default Authorize;
