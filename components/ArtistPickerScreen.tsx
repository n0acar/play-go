import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Image from "next/image";
import { BiCheckCircle, BiSearch } from "react-icons/bi";
import ArtistSearch from "./ArtistSearch";

interface Props {
  spotifyWebApi: SpotifyWebApi.SpotifyWebApiJs;
  setSeedArtists: Dispatch<SetStateAction<SpotifyApi.ArtistObjectFull[]>>;
}

const ArtistPickerScreen: React.FC<Props> = ({
  spotifyWebApi,
  setSeedArtists,
}) => {
  const MAX_ARTIST_PICK_NUMBER = 5;
  const MIN_ARTIST_PICK_NUMBER = 3;

  const [favoriteArtists, setFavoriteArtists] = useState<
    SpotifyApi.ArtistObjectFull[]
  >([]);

  const [selectedArtists, setSelectedArtists] = useState<
    SpotifyApi.ArtistObjectFull[]
  >([]);

  useEffect(() => {
    if (favoriteArtists.length === 0) {
      spotifyWebApi
        .getMyTopArtists({ limit: 23 })
        .then((artists) => setFavoriteArtists(artists.items));
    }
  }, [favoriteArtists]);

  const handleSelection = (clicked: SpotifyApi.ArtistObjectFull) => {
    if (!selectedArtists.includes(clicked)) {
      if (selectedArtists.length >= MAX_ARTIST_PICK_NUMBER) return;
      setSelectedArtists([...selectedArtists, clicked]);
    } else {
      setSelectedArtists(
        selectedArtists.filter((artist) => clicked !== artist)
      );
    }
  };

  const handleSearch: (searched: SpotifyApi.ArtistObjectFull) => void = (
    searched
  ) => {
    const existingArtist = favoriteArtists.find(
      (favorite) => favorite.id === searched.id
    );
    if (existingArtist) {
      handleSelection(existingArtist);
    } else {
      setFavoriteArtists([searched, ...favoriteArtists]);
      handleSelection(searched);
    }
  };

  return (
    <div className="md:max-h-screen mx-2 md:mx-0">
      <div className="flex justify-between h-16 items-center my-2">
        <span className="text-center text-zinc-100 font-bold text-4xl">{`Pick artists ${selectedArtists.length}/${MAX_ARTIST_PICK_NUMBER}`}</span>
        {selectedArtists.length >= MIN_ARTIST_PICK_NUMBER && (
          <button
            className="ring ring-zinc-100 bg-zinc-900 rounded-3xl h-11 active:h-10 px-4 text-zinc-100 text-2xl hover:ring-lime-500 hover:text-zinc-900 hover:bg-zinc-100 font-medium shadow-zinc-100 shadow-sm opacity-85 hover:opacity-100"
            onClick={() => {
              setSeedArtists(selectedArtists);
            }}
          >
            Start Radio
          </button>
        )}
      </div>
      <div className="overflow-y-scroll md:max-h-96">
        <ul className="grid grid-cols-4 gap-4">
          <li key="artist-search">{SearchCard(handleSearch)}</li>
          {favoriteArtists.map((artist) => (
            <li key={artist.id}>{ArtistCard(artist)}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  function ArtistCard(artist: SpotifyApi.ArtistObjectFull) {
    return (
      <button
        className="relative group"
        onClick={(e) => handleSelection(artist)}
      >
        <Image
          className="absolute inset-0 shadow-md hover:blur-[1px] text-zinc-900 group-hover:opacity-10 group-active:opacity-20"
          src={artist.images[0].url}
          alt="Album Cover"
          width="150%"
          height="150%"
        />
        <span className="absolute inset-0 flex justify-center items-center group-hover:visible invisible text-zinc-100 text-2xl overflow-hidden break-words">
          {artist.name}
        </span>
        {selectedArtists.includes(artist) && (
          <BiCheckCircle className="absolute inset-0 text-2xl m-2 text-lime-500 bg-zinc-900 rounded-full" />
        )}
      </button>
    );
  }

  function SearchCard(
    handleSearch: (artist: SpotifyApi.ArtistObjectFull) => void
  ) {
    return (
      <>
        <button
          className="shadow-md flex justify-center font-bold h-full w-full text-zinc-100 bg-zinc-900 hover:bg-zinc-800 hover:text-lime-500"
          onClick={() => (window as any).modal.showModal()}
        >
          <BiSearch className="h-full text-6xl" />
        </button>
        <dialog id="modal" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box h-64">
            <ArtistSearch
              handleSearch={handleSearch}
              spotifyWebApi={spotifyWebApi}
            />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }
};

export default ArtistPickerScreen;
