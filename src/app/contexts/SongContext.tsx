"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  ISongContext,
  SongContextState,
  SongReducerActionType,
} from "../types";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { songReducer } from "../reducers/songReducer";

const defaultSongContextState: SongContextState = {
  selectedSongId: undefined,
  selectedSong: null,
  isPlaying: false,
  volume: 50,
  deviceId: null,
};

// create song context
export const SongContext = createContext<ISongContext>({
  songContextState: defaultSongContextState,
  dispatchSongAction: () => {},
});

// method to use song context
export const useSongContext = () => useContext(SongContext);

// song context provider
const SongContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  // handle song context states by reducer
  const [songContextState, dispatchSongAction] = useReducer(
    songReducer,
    defaultSongContextState
  );
  useEffect(() => {
    const setCurrentDevice = async () => {
      const availableDevice = await spotifyApi.getMyDevices();
      if (!availableDevice.body.devices.length) return;
      const { id: deviceId, volume_percent } = availableDevice.body.devices[0];
      // get current user device
      dispatchSongAction({
        type: SongReducerActionType.SetDevice,
        payload: {
          deviceId,
          volume: volume_percent as number,
        },
      });
      // get all current info from main account
      await spotifyApi.transferMyPlayback([deviceId as string]);
    };
    if (spotifyApi.getAccessToken()) {
      setCurrentDevice();
    }
  }, [spotifyApi, session]);

  useEffect(() => {
    const getCurrentPlaySong = async () => {
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
    if (spotifyApi.getAccessToken()) {
      getCurrentPlaySong();
    }
  }, [spotifyApi, session]);

  const songContextProviderData = {
    songContextState,
    dispatchSongAction,
  };
  return (
    <SongContext.Provider value={songContextProviderData}>
      {children}
    </SongContext.Provider>
  );
};

export default SongContextProvider;
