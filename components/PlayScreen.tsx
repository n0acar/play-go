import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SpotifyWebApi from "spotify-web-api-js";
import ControlButtons, { ControlButtonProps } from "./ControlButtons";
import SongDetails, { SongDetailProps } from "./SongDetails";

interface Props {
  spotifyWebApi: SpotifyWebApi.SpotifyWebApiJs;
  player: Spotify.Player;
}

const PlayScreen: React.FC<Props> = ({ spotifyWebApi, player }) => {
  const songDetails: SongDetailProps = {
    albumCover: "/logo_white.png",
    trackName: "Just Play",
    artist: "Just Play Presents",
    uri: "",
  };

  const [playerState, setPlayerState] = useState<Spotify.PlaybackState | null>(
    null
  );
  const [isPlaying, setPlaying] = useState(false);
  const [songDetail, setSongDetail] = useState<SongDetailProps>(songDetails);

  useEffect(() => {
    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });

    // Playback status updates
    player.addListener("player_state_changed", (state) => {
      console.log("playerStateChanged");
      if (!state) {
        console.error("User is not playing music through the Web Playback SDK");
        return;
      }
      setPlayerState(state);
    });
  }, [player]);

  useEffect(() => {
    if (!playerState) {
      return;
    }
    setPlaying(!playerState.paused);
    const currentTrack = playerState.track_window.current_track;
    setSongDetail({
      albumCover: currentTrack.album.images[0].url,
      trackName: currentTrack.name,
      artist: currentTrack.artists.flatMap((artist) => artist.name).join(", "),
      uri: currentTrack.uri.substring(14), //spotify:track
    });
  }, [playerState]);

  const controlButtons: ControlButtonProps = {
    isPlaying: isPlaying,
    play: () => {
      player.togglePlay();
    },
    pause: () => {
      player.togglePlay();
    },
    next: () => {
      player.nextTrack();
    },
    addToPlaylist: () => {
      if (songDetail.uri.length > 0) {
        spotifyWebApi
          .addToMySavedTracks([songDetail.uri])
          .then(() => toast.success(`Added to the Liked Songs.`))
          .catch(() => toast.error("Unexpected Error"));
      } else {
        toast.error("Unexpected Error");
      }
    },
  };

  return (
    <div className="flex flex-col justify-center items-center rounded-lg w-full sm:w-3/5 h-screen sm:h-1/2">
      <SongDetails {...songDetail} />
      <ControlButtons {...controlButtons} />
    </div>
  );
};

export default PlayScreen;
