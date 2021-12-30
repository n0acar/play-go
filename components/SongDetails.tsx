import Image from "next/image";
import React from "react";

export interface SongDetailProps {
  albumCover: string;
  trackName: string;
  artist: string;
}

const SongDetails: React.FC<SongDetailProps> = ({
  albumCover,
  trackName,
  artist,
}) => {
  return (
    <div>
      <Image src={albumCover} alt="Album Cover" width="100%" height="100%" />
      <h2>{trackName}</h2>
      <h4>{artist}</h4>
    </div>
  );
};

export default SongDetails;
