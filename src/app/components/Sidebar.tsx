"use client";
import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import "../styles/common.scss";
import IconButton from "./IconButton";

import { usePlaylistContext } from "../contexts/PlaylistContext";
import useSpotify from "../hooks/useSpotify";

const Devider = () => <hr className="w-full border-t-[2px] border-gray-900" />;

export default function Sidebar() {
  const {
    playlistContextState: { playlists },
    updatePlaylistContextState,
  } = usePlaylistContext();
  const spotifyApi = useSpotify();
  const setSelectedPlaylist = async (playListId: string) => {
    const playlistResponse = await spotifyApi.getPlaylist(playListId);
    updatePlaylistContextState({
      selectedPlaylistId: playListId,
      selectedPlaylist: playlistResponse.body,
    });
  };

  return (
    <div className="text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-gray-900 h-screen overflow-y-scroll hide-scrollbar sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block">
      <div className="space-y-4">
        <IconButton icon={HomeIcon} label={"Home"} width={5} height={5} />
        <IconButton
          icon={MagnifyingGlassIcon}
          label={"Search"}
          width={5}
          height={5}
        />
        <IconButton
          icon={BuildingLibraryIcon}
          label={"My Library"}
          width={5}
          height={5}
        />
        <Devider />
        <IconButton
          icon={PlusCircleIcon}
          label={"Create playlist"}
          width={5}
          height={5}
        />
        <IconButton
          icon={HeartIcon}
          label={"Liked songs"}
          width={5}
          height={5}
        />
        <IconButton
          icon={RssIcon}
          label={"Your episodes"}
          width={5}
          height={5}
        />
        <Devider />
        {/* playlist songs */}
        {playlists?.map(({ id, name }) => (
          <p
            key={id}
            className="cursor-pointer hover:underline transition-all hover:text-white"
            onClick={() => setSelectedPlaylist(id)}
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
}
