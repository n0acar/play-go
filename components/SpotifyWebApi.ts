import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import SpotifyWebApi from "spotify-web-api-js";

const useSpotifyWebApi = () => {
  const [{ accessToken }, _] = useContext(AuthContext);
  const [spotify, setSpotify] = useState<SpotifyWebApi.SpotifyWebApiJs>();

  useEffect(() => {
    if (accessToken && accessToken !== "") {
      var tempSpotify = new SpotifyWebApi();
      tempSpotify.setAccessToken(accessToken);
      setSpotify(tempSpotify);
    } else {
      setSpotify(undefined);
    }
  }, [accessToken]);

  return spotify;
};

export default useSpotifyWebApi;
