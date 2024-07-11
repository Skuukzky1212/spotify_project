import {
  SongContextState,
  SongReducerAction,
  SongReducerActionType,
} from "../types";

// params: state default, action
export const songReducer = (
  state: SongContextState,
  { type, payload }: SongReducerAction
) => {
  switch (type) {
    case SongReducerActionType.SetDevice:
      return {
        ...state,
        deviceId: payload.deviceId,
        volume: payload.volume,
      };
    case SongReducerActionType.ToggleIsPlaying:
      return {
        ...state,
        isPlaying: payload,
      };

    case SongReducerActionType.SetCurrentPlayingSong:
      const { selectedSong, selectedSongId, isPlaying } = payload;
      return {
        ...state,
        selectedSongId,
        selectedSong,
        isPlaying,
      };
    case SongReducerActionType.SetVolume:
      return {
        ...state,
        volume: payload,
      };
    default:
      return state;
  }
};
