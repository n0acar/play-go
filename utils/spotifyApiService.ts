import querystring from "query-string";
import axios from "axios";

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

export const getAudioFeatures = (accessToken: string, trackIds: []) => {
  var url: string = `https://api.spotify.com/v1/audio-features`;
  var params = { ids: trackIds.join(",") };
  var headers: any = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return axios.get(querystring.stringifyUrl({ url: url, query: params }), {
    headers: headers,
  });
};

const getGenreRecommendations = (
  accessToken: string,
  genre: string,
  targetFeatures: any
) => {
  return getRecommendations(
    accessToken,
    {
      seed_artists: [],
      seed_tracks: [],
      seed_genres: [genre],
    },
    targetFeatures
  );
};

const getArtistRecommendations = (
  accessToken: string,
  artistIds: string[],
  targetFeatures: any
) => {
  return getRecommendations(
    accessToken,
    {
      seed_artists: artistIds,
      seed_tracks: [],
      seed_genres: [],
    },
    targetFeatures
  );
};

interface SeedItems {
  seed_artists: string[];
  seed_tracks: string[];
  seed_genres: string[];
}

const getRecommendations = (
  accessToken: string,
  seedItems: SeedItems,
  targetFeatures: any
) => {
  var url: string = "https://api.spotify.com/v1/recommendations";
  var params: any = Object.fromEntries(
    Object.entries(seedItems).map(([seedKey, seedValue]) => [
      seedKey,
      seedValue.join(","),
    ])
  );
  params = { ...params, ...targetFeatures };
  console.log(params);
  var headers: any = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return axios.get(querystring.stringifyUrl({ url: url, query: params }), {
    headers: headers,
  });
};

const getTopItems = (
  accessToken: string,
  type: string,
  limit: number = 50,
  time_range: string = "long_term"
) => {
  var url: string = `https://api.spotify.com/v1/me/top/${type}`;
  var params = { limit: limit, time_range: time_range };
  var headers: any = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return axios.get(querystring.stringifyUrl({ url: url, query: params }), {
    headers: headers,
  });
};

const buildAudioFeatureProfile = (audioFeatures: any[]) => {
  const targetAudioFeatures = audioFeatures.map((audioFeature) =>
    Object({
      acousticness: audioFeature.acousticness,
      danceability: audioFeature.danceability,
      energy: audioFeature.energy,
      instrumentalness: audioFeature.instrumentalness,
    })
  );
  const meanAcousticness =
    targetAudioFeatures.reduce((a, b) => a + b.acousticness, 0) /
    targetAudioFeatures.length;
  const meanDanceability =
    targetAudioFeatures.reduce((a, b) => a + b.danceability, 0) /
    targetAudioFeatures.length;
  const meanEnergy =
    targetAudioFeatures.reduce((a, b) => a + b.energy, 0) /
    targetAudioFeatures.length;
  const meanInstrumentalness =
    targetAudioFeatures.reduce((a, b) => a + b.instrumentalness, 0) /
    targetAudioFeatures.length;
  const meanSong = Object({
    target_acousticness: meanAcousticness,
    target_danceability: meanDanceability,
    target_energy: meanEnergy,
    target_instrumentalness: meanInstrumentalness,
  });
  console.log(meanSong);
  return meanSong;
};

export const recommendSongs = async (accessToken: string) => {
  const topTracks = (await getTopItems(accessToken, "tracks")).data.items;
  var topArtists = (await getTopItems(accessToken, "artists", 50)).data.items;
  topArtists = topArtists.sort(() => 0.5 - Math.random()).slice(0, 5);
  const recommendedSongs = await getAudioFeatures(
    accessToken,
    topTracks.map((track: { id: string }) => track.id)
  ).then(async (response) => {
    const targetAudioFeatures = response.data.audio_features;
    const meanSong = buildAudioFeatureProfile(targetAudioFeatures);
    const result = (
      await getArtistRecommendations(
        accessToken,
        topArtists.map((artist: { id: string }) => artist.id),
        meanSong
      )
    ).data;
    console.log("result");
    console.log(result);
    return result;
  });
  return recommendedSongs;
};
