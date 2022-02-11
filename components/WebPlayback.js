import useScript from "../utils/useScript.ts";
import { useEffect } from "react";
import * as SpotifyApiService from "../utils/spotifyApiService";

const WebPlayback = ({ accessToken, setPlayer }) => {
  useScript("https://sdk.scdn.co/spotify-player.js");
  useEffect(() => {
    const getAccessToken = () => {
      return accessToken;
    };

    const handleLoadSuccess = (getAccessToken) => {
      console.log("Script loaded");
      const player = new window.Spotify.Player({
        name: "Just Play Web Player",
        getOAuthToken: (cb) => {
          cb(getAccessToken());
        },
        volume: 1,
      });
      console.log(player);

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
      player.addListener("player_state_changed", (state) => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        SpotifyApiService.transferPlayer(device_id, accessToken).then(
          (response) => {
            //SpotifyApiService.skipToNextTrack(accessToken, device_id);
            SpotifyApiService.getTopItems(accessToken, "artists").then(
              (response) => {
                const artistIds = response.data.items.map((item) => item.id);
                SpotifyApiService.getRecommendations(accessToken, {
                  seed_artists: artistIds,
                  seed_tracks: [
                    //"6eoSl3jbzRxzKaccJvO10c",
                    //"2OQBMk1LZIMw67MfHEe8Tg",
                    "5XaARV8kBv7rZOl2bkKHR8",
                  ],
                  seed_genres: [],
                }).then((recRes) => {
                  const tracks = recRes.data.tracks;
                  console.log(tracks);
                  tracks.forEach((track) => {
                    SpotifyApiService.addToQueue(
                      accessToken,
                      track.uri,
                      device_id
                    );
                  });
                });
              }
            );
            setPlayer(player);
          }
        );
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
        setPlayer(null);
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
