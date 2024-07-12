"use client";
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  PlayIcon,
  StopIcon,
  ForwardIcon,
  ArrowUturnLeftIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import useSpotify from "../hooks/useSpotify";
import { useSongContext } from "../contexts/SongContext";
import { SongReducerActionType } from "../types";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEventHandler } from "react";
const Player = () => {
  const spotifyApi = useSpotify();
  const {
    songContextState: { isPlaying, selectedSong, deviceId, volume },
    dispatchSongAction,
  } = useSongContext();

  const handlePlayPause = async () => {
    // fetching here!!!
    const response = await spotifyApi.getMyCurrentPlaybackState();
    if (!response.body) return;
    if (response.body.is_playing) {
      await spotifyApi.pause();
      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: false,
      });
    } else {
      await spotifyApi.play();
      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: true,
      });
    }
  };

  const handleSkipSong = async (skipTo: "previous" | "next") => {
    if (!deviceId) return;

    if (skipTo === "previous") await spotifyApi.skipToPrevious();
    else await spotifyApi.skipToNext();

    // Introduce a delay to give the Spotify API time to update the track
    await new Promise((resolve) => setTimeout(resolve, 500));

    const songInfo = await spotifyApi.getMyCurrentPlayingTrack();

    if (!songInfo.body) return;

    dispatchSongAction({
      type: SongReducerActionType.SetCurrentPlayingSong,
      payload: {
        selectedSongId: songInfo.body.item?.id,
        selectedSong: songInfo.body.item as SpotifyApi.TrackObjectFull,
        isPlaying: songInfo.body.is_playing,
      },
    });
  };

  // debounce when user change volume
  const debounceAdjustVolume = useDebouncedCallback((volume: number) => {
    spotifyApi.setVolume(volume);
  }, 500);

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const volume = Number(event.target.value);
    if (!deviceId) return;
    debounceAdjustVolume(volume);
    dispatchSongAction({
      type: SongReducerActionType.SetVolume,
      payload: volume,
    });
  };
  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-2 md:grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        {selectedSong && (
          <>
            <div className="hidden md:block">
              <Image
                src={selectedSong.album.images[0].url}
                alt={selectedSong.album.name}
                height="40"
                width="40"
              />
            </div>
            <div>
              <h3>{selectedSong.name}</h3>
              <p>{selectedSong.artists[0].name}</p>
            </div>
          </>
        )}
      </div>
      {/* Center */}
      <div className="flex justify-evenly items-center">
        <ArrowsRightLeftIcon className="icon-playback" />
        <BackwardIcon
          className="icon-playback"
          onClick={handleSkipSong.bind(this, "previous")}
        />
        {isPlaying ? (
          <StopIcon className="icon-playback" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="icon-playback" onClick={handlePlayPause} />
        )}
        <ForwardIcon
          className="icon-playback"
          onClick={handleSkipSong.bind(this, "next")}
        />
        <ArrowUturnLeftIcon className="icon-playback" />
      </div>
      {/* Right */}
      <div className="justify-end items-center pr-5 space-x-3 md:space-x-4 hidden md:flex ">
        <SpeakerWaveIcon className="icon-playback" />
        <input
          type="range"
          min={0}
          max={100}
          className="w-20 md:w-auto"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default Player;
