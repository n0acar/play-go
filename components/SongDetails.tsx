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
    <div className="p-1">
      <Image
        className="rounded-md"
        src={albumCover}
        alt="Album Cover"
        width="200%"
        height="200%"
      />
      <div>
        <p className="md:text-3xl text-xl">{trackName}</p>
        <p className="md:text-lg text-md">{artist}</p>
      </div>
    </div>
  );
};

export default SongDetails;
