import Image from "next/image";
import React from "react";

export interface SongDetailProps {
  albumCover: string;
  trackName: string;
  artist: string;
  uri: string;
}

const SongDetails: React.FC<SongDetailProps> = ({
  albumCover,
  trackName,
  artist,
}) => {
  return (
    <div className="pt-5 p-3">
      <Image
        className="rounded-md"
        src={albumCover}
        alt="Album Cover"
        width="250%"
        height="250%"
      />
      <div>
        <p className="md:text-3xl text-xl font-medium">{trackName}</p>
        <p className="md:text-lg text-md">{artist}</p>
      </div>
    </div>
  );
};

export default SongDetails;
