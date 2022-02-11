import querystring from "query-string";
import axios from "axios";

export const getTopItems = (accessToken: string, type: string) => {
  var url: string = `https://api.spotify.com/v1/me/top/${type}`;
  var params = { limit: 4, time_range: "long_term" };
  var headers: any = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return axios.get(querystring.stringifyUrl({ url: url, query: params }), {
    headers: headers,
  });
};

export const getRecommendations = (
  accessToken: string,
  seedItems: {
    seed_artists: string[];
    seed_tracks: string[];
    seed_genres: string[];
  }
) => {
  var url: string = "https://api.spotify.com/v1/recommendations";
  var params: any = Object.fromEntries(
    Object.entries(seedItems).map(([seedKey, seedValue]) => [
      seedKey,
      seedValue.join(","),
    ])
  );
  params = {
    ...params,
    limit: 20,
    max_danceability: 0.75,
    target_danceability: 0.5,
    max_speechiness: 0.2,
    max_energy: 0.5,
    target_energy: 0.25,
  };
  var headers: any = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return axios.get(querystring.stringifyUrl({ url: url, query: params }), {
    headers: headers,
  });
};

export const transferPlayer = (deviceId: string, accessToken: string) => {
  const url = "https://api.spotify.com/v1/me/player";
  const form = { device_ids: [deviceId] };
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return axios.put(url, JSON.stringify(form), {
    headers: headers,
  });
};

export const skipToNextTrack = (accessToken: string, deviceId: string) => {
  const url = "https://api.spotify.com/v1/me/player/next";
  const params = { device_id: deviceId };
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return axios.post(
    querystring.stringifyUrl({ url: url, query: params }),
    "{}",
    {
      headers: headers,
    }
  );
};

export const addToQueue = (
  accessToken: string,
  uri: string,
  deviceId: string
) => {
  const url = "https://api.spotify.com/v1/me/player/queue";
  var params = { uri: uri, device_id: deviceId };
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return axios
    .post(querystring.stringifyUrl({ url: url, query: params }), "{}", {
      headers: headers,
    })
    .then(() => console.log(`${uri} uri added`))
    .catch((error) => console.error("NOT ADDED"));
};
