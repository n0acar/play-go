import { NextPage } from "next";
import React, { useContext, useState } from "react";
import PlayScreen from "../components/PlayScreen";
import useSpotifyWebApi from "../components/SpotifyWebApi";
import WebPlayback from "../components/WebPlayback";
import AuthContext from "../contexts/AuthContext";

const Justplay: NextPage = () => {
  const [{ accessToken }, _] = useContext(AuthContext);
  const [player, setPlayer] = useState<Spotify.Player>();
  const spotifyWebApi = useSpotifyWebApi();

  return (
    <div className="flex justify-center items-center text-center font-light">
      {player && spotifyWebApi && (
        <PlayScreen spotifyWebApi={spotifyWebApi} player={player} />
      )}
      {accessToken && spotifyWebApi && (
        <WebPlayback
          accessToken={accessToken}
          setPlayer={setPlayer}
          spotifyWebApi={spotifyWebApi}
        />
      )}
    </div>
  );
};

export default Justplay;
