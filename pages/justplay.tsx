import { NextPage } from "next";
import React, { useContext, useState } from "react";
import PlayScreen from "../components/PlayScreen";
import WebPlayback from "../components/WebPlayback";
import AuthContext from "../contexts/AuthContext";

const justplay: NextPage = () => {
  const [authItem, setAuthItem] = useContext(AuthContext);
  const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(
    null
  );

  return (
    <div>
      <WebPlayback
        accessToken={authItem.accessToken}
        setPlayer={setSpotifyPlayer}
      />
      {spotifyPlayer && <PlayScreen player={spotifyPlayer} />}
    </div>
  );
};

export default justplay;
