import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import querystring from "query-string";

interface SeedItems {
  seed_artists: string[];
  seed_tracks: string[];
  seed_genres: string[];
}

var similarity = require("compute-cosine-similarity");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const start = new Date();
  const accessToken = req.headers.accesstoken as string;
  const genre = req.query.genre as string;

  const topTracks = (await getTopItems(accessToken, "tracks")).data.items;
  var topArtists = (await getTopItems(accessToken, "artists")).data.items;
  topArtists = topArtists.sort(() => 0.5 - Math.random()).slice(0, 5);
  const referenceAudioFeatures = getAudioFeatures(
    accessToken,
    topTracks.map((track: { id: string }) => track.id)
  ).then((response) => {
    const targetAudioFeatures = response.data.audio_features;
    const meanSong = buildAudioFeatureProfile(targetAudioFeatures);
    const trackRecommendationsByGenre = getArtistRecommendations(
      accessToken,
      topArtists.map((artist: { id: string }) => artist.id),
      meanSong
    ).then((response) => res.json(response.data));
  });

  console.log((new Date() as unknown as number) - (start as unknown as number));
}

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

const getAudioFeatures = (accessToken: string, trackIds: []) => {
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
