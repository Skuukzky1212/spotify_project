"use client";
import {
  HomeIcon,
  HeartIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  RssIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import IconButton from "./IconButton";
import "../styles/common.scss";

import { signOut } from "next-auth/react";
interface props {
  userName: string | null | undefined;
}

const Devider = () => <hr className="w-full border-t-[2px] border-gray-900" />;
export default function Sidebar({ userName }: props) {
  return (
    <div className="text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-gray-900 h-screen overflow-y-scroll hide-scrollbar sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block">
      <div className="space-y-4">
        {userName && (
          <button
            className="hover:underline"
            onClick={() => {
              signOut();
            }}
          >
            {userName} - Log Out
          </button>
        )}
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
      </div>
    </div>
  );
}
