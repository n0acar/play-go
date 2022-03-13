import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ControlButtons, { ControlButtonProps } from "./ControlButtons";
import SongDetails, { SongDetailProps } from "./SongDetails";

interface Props {
  player: Spotify.Player;
}

const PlayScreen: React.FC<Props> = ({ player }) => {
  const songDetails: SongDetailProps = {
    albumCover:
      "https://i.scdn.co/image/ab67616d00001e021ae967e4a02c7a39eb3c189b",
    trackName: "Sundress",
    artist: "A$AP Rocky",
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
      toast.success("Success baby");
    },
  };

  return (
    <div className="flex flex-col justify-center items-center rounded-lg my-10 w-full sm:w-3/5 h-screen sm:h-1/2">
      <SongDetails {...songDetail} />
      <ControlButtons {...controlButtons} />
    </div>
  );
};

export default PlayScreen;
