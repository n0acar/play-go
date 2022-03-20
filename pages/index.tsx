import axios from "axios";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const authorize = () => {
    axios
      .get<string>("/api/auth/authorize")
      .then((response) => (window.location.href = response.data));
  };

  return (
    <div className="text-center h-full flex flex-col items-center align-middle justify-center">
      <h1>Just Play</h1>
      <p>saves you from the beautiful user interface of Spotify</p>
      <button
        className="ring ring-zinc-100 bg-zinc-900 rounded-3xl h-11 w-72 active:h-10  text-zinc-100 text-2xl hover:ring-lime-500 hover:text-zinc-900 hover:bg-zinc-100 font-medium shadow-zinc-100 shadow-sm opacity-85 hover:opacity-100"
        onClick={authorize}
      >
        Just Play!
      </button>
    </div>
  );
};

export default Home;
