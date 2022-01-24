import useScript from "../utils/useScript.tsx";
import { useEffect } from "react";
import axios from "axios";

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

      const transferPlayer = (deviceId) => {
        const url = "https://api.spotify.com/v1/me/player";
        const form = { device_ids: [deviceId] };
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };
        axios
          .put(url, JSON.stringify(form), {
            headers: headers,
          })
          .then(() => setPlayer(player));
      };

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        transferPlayer(device_id);
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
