"use client";
import { signOut, useSession } from "next-auth/react";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import Image from "next/image";
import NoImage from "../assets/noimg.jpg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";
import { useEffect, useState } from "react";
import { pickRandom } from "../utils/pickRandomColor";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-violet-500",
];

const Center = () => {
  const {
    playlistContextState: { selectedPlaylist, selectedPlaylistId },
  } = usePlaylistContext();
  const { data: session } = useSession();

  const [fromColor, setFromColor] = useState<string | null>(null);

  useEffect(() => {
    setFromColor(pickRandom(colors));
  }, [selectedPlaylistId]);

  return (
    <div className="flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hidden">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full py-1 pl-1 pr-2"
          onClick={() => {
            signOut();
          }}
        >
          <Image
            src={session?.user?.image || NoImage}
            alt={session?.user?.name || ""}
            height="40"
            width="40"
            className="rounded-full object-cover"
          />
          <h2>{session?.user?.name}</h2>
          <IconButton icon={ChevronDownIcon} label={""} width={5} height={5} />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${fromColor} to-black transition-all h-80 p-8`}
      >
        {selectedPlaylist && (
          <>
            <Image
              src={selectedPlaylist.images[0].url}
              alt={selectedPlaylist.name}
              width="176"
              height="176"
              className="shadow-2xl"
            />
            <div>
              <p>PLAYLIST</p>
              <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
                {selectedPlaylist.name}
              </h1>
            </div>
          </>
        )}
      </section>
      {/* songs */}
      <div>
       <Songs/>
      </div>
    </div>
  );
};

export default Center;
