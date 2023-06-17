import useScript from "../utils/useScript";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const WebPlayback: React.FC<{
  accessToken: string;
  setPlayer: React.Dispatch<React.SetStateAction<Spotify.Player | undefined>>;
  spotifyWebApi: SpotifyWebApi.SpotifyWebApiJs;
  seedArtists: SpotifyApi.ArtistObjectFull[];
}> = ({ accessToken, setPlayer, spotifyWebApi, seedArtists }) => {
  useScript("https://sdk.scdn.co/spotify-player.js");
  useEffect(() => {
    const getAccessToken = () => {
      return accessToken;
    };

    const handleLoadSuccess = (getAccessToken: { (): string; (): string }) => {
      console.log("Script loaded");
      const player = new window.Spotify.Player({
        name: "Just Play Web Player",
        getOAuthToken: (cb) => {
          cb(getAccessToken());
        },
        volume: 1,
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", (state) => {});

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        spotifyWebApi
          .transferMyPlayback([device_id])
          .then(() => {
            console.log(seedArtists);
            return spotifyWebApi.getRecommendations({
              seed_artists: seedArtists.map((artist) => artist.id),
            });
          })
          .then(async (recommendedSongs) => {
            for (let track of recommendedSongs.tracks) {
              await spotifyWebApi.queue(track.uri, { device_id: device_id });
            }
          })
          .then(() => spotifyWebApi.skipToNext({ device_id: device_id }));
        setPlayer(player);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
        setPlayer(undefined);
      });

      // Connect to the player!
      player.connect();
    };

    window.onSpotifyWebPlaybackSDKReady = () => {
      handleLoadSuccess(getAccessToken);
    };
  }, [accessToken]);

  return <></>;
};

export default WebPlayback;
