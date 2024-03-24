import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import SpotifyWebApi from "spotify-web-api-js";
import Image from "next/image";

interface Props {
  handleSearch: (artist: SpotifyApi.ArtistObjectFull) => void;
  spotifyWebApi: SpotifyWebApi.SpotifyWebApiJs;
}

const ArtistSearch: React.FC<Props> = ({ handleSearch, spotifyWebApi }) => {
  const [selected, _] = useState<SpotifyApi.ArtistObjectFull>();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const searchArtistsQuery = useQuery(["search", debouncedQuery], async () => {
    const response = await spotifyWebApi.searchArtists(debouncedQuery, {
      limit: 5,
    });
    return response.artists.items;
  });

  const [searchedArtists, setSearchedArtists] = useState<
    SpotifyApi.ArtistObjectFull[]
  >([]);

  const handleChange = (selectedArtist: SpotifyApi.ArtistObjectFull) => {
    console.log(selectedArtist);
    handleSearch(selectedArtist);
  };

  useEffect(() => {
    if (debouncedQuery.length > 2 && searchArtistsQuery.data) {
      setSearchedArtists(
        searchArtistsQuery.data as unknown as SpotifyApi.ArtistObjectFull[]
      );
    } else {
      setSearchedArtists([]);
    }
  }, [debouncedQuery, searchArtistsQuery.data]);

  return (
    <Combobox value={selected} onChange={handleChange}>
      <div className="relative bg-transparent h-full">
        <div className="relative bg-transparent w-full text-left rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm">
          <Combobox.Input
            autoComplete="off"
            placeholder="Your favorite artist 🧑‍🎤"
            className="w-full h-full border-none focus:outline-none py-2 pl-3 pr-10 text-md leading-5 text-zinc-100 overflow-hidden bg-transparent"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {debouncedQuery.length > 2 && (
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="z-50 absolute w-full overflow-auto flex flex-row">
              {searchedArtists.length === 0 ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                  {searchArtistsQuery.isLoading
                    ? "Loading..."
                    : "Nothing found."}
                </div>
              ) : (
                searchedArtists.map((artist) => (
                  <Combobox.Option
                    key={artist.id}
                    className={({ active }) =>
                      `cursor-default select-none relative p-1 ${
                        active ? "bg-lime-500" : ""
                      }`
                    }
                    value={artist}
                  >
                    {({ selected }) => (
                      <div className="flex flex-row">
                        <Image
                          className="mx-1"
                          src={artist.images[0].url}
                          alt="Album Cover"
                          width="200%"
                          height="200%"
                        />
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        )}
      </div>
    </Combobox>
  );
};

export default ArtistSearch;
