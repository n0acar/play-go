import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

interface Props {
  spotifyWebApi: SpotifyWebApi.SpotifyWebApiJs;
  seedArtists: SpotifyApi.ArtistObjectFull[];
}

const RecommendedPlaylist: React.FC<Props> = ({
  spotifyWebApi,
  seedArtists,
}) => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>([]);
  const seedArtistIds = seedArtists.map((artist) => artist.id);

  useEffect(() => {
    spotifyWebApi
      .getRecommendations({
        seed_artists: seedArtists.map((artist) => artist.id),
        limit: 100,
      })
      .then((recommendations) => setTracks(recommendations.tracks));

    return () => {};
  }, []);

  return (
    <div>
      {tracks &&
        console.log(
          tracks
            .filter((track) =>
              track.artists.some((artist) => seedArtistIds.includes(artist.id))
            )
            .map((track) => track.artists.map((artist) => artist.name))
        )}
      {tracks &&
        console.log(
          tracks.map((track) => track.artists.map((artist) => artist.name))
        )}
    </div>
  );
};

export default RecommendedPlaylist;
