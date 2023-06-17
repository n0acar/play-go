import { NextPage } from "next";
import React, { useContext, useState } from "react";
import PlayScreen from "../components/PlayScreen";
import useSpotifyWebApi from "../components/SpotifyWebApi";
import WebPlayback from "../components/WebPlayback";
import AuthContext from "../contexts/AuthContext";
import ArtistPickerScreen from "../components/ArtistPickerScreen";

const Justplay: NextPage = () => {
  const [{ accessToken }, _] = useContext(AuthContext);
  const [player, setPlayer] = useState<Spotify.Player>();
  const [seedArtists, setSeedArtists] = useState<Spotify.Artist[]>([]);
  const spotifyWebApi = useSpotifyWebApi();

  if (!!!spotifyWebApi) {
    return null;
  }

  return (
    <div className="flex justify-center items-center text-center font-light">
      {seedArtists.length <= 0 ? (
        <ArtistPickerScreen
          spotifyWebApi={spotifyWebApi}
          setSeedArtists={setSeedArtists}
        />
      ) : (
        <>
          {player && (
            <PlayScreen spotifyWebApi={spotifyWebApi} player={player} />
          )}
          {accessToken && (
            <WebPlayback
              accessToken={accessToken}
              setPlayer={setPlayer}
              spotifyWebApi={spotifyWebApi}
              seedArtists={seedArtists}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Justplay;
