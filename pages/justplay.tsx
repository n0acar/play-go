import { NextPage } from "next";
import React, { useContext, useState } from "react";
import PlayScreen from "../components/PlayScreen";
import WebPlayback from "../components/WebPlayback";
import AuthContext from "../contexts/AuthContext";

const Justplay: NextPage = () => {
  const [authItem, setAuthItem] = useContext(AuthContext);
  const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(
    null
  );

  return (
    <div className="flex justify-center items-center text-center font-light">
      {spotifyPlayer && <PlayScreen player={spotifyPlayer} />}
      {authItem.accessToken && (
        <WebPlayback
          accessToken={authItem.accessToken}
          setPlayer={setSpotifyPlayer}
        />
      )}
    </div>
  );
};

export default Justplay;
