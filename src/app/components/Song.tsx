import Image from "next/image";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import { convertDuration } from "../utils/convertDuration";
import useSpotify from "../hooks/useSpotify";
import { useSongContext } from "../contexts/SongContext";
import { SongReducerActionType } from "../types";
interface Props {
  item: SpotifyApi.PlaylistTrackObject;
  itemIndex: number;
}
const Song = ({ item: { track }, itemIndex }: Props) => {
  const {
    playlistContextState: { selectedPlaylist },
  } = usePlaylistContext();

  const spotifyApi = useSpotify();
  
  const {
    songContextState: { deviceId },
    dispatchSongAction,
  } = useSongContext();

  const playSong = async () => {
    if (!deviceId) return;
    dispatchSongAction({
      type: SongReducerActionType.SetCurrentPlayingSong,
      payload: {
        selectedSongId: track?.id,
        selectedSong: track,
        isPlaying: true,
      },
    });
    await spotifyApi.play({
      device_id: deviceId,
      context_uri: selectedPlaylist?.uri,
      offset: {
        uri: track?.uri as string,
      },
    });
  };
  return (
    <div
      className="grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{itemIndex + 1}</p>
        <div>
          <Image
            src={track?.album.images[0].url || ""}
            alt="track cover"
            height="40"
            width="40"
            className="hidden md:block "
          />
        </div>
        <div>
          <p className="w-36 lg:w-72 truncate text-white">{track?.name}</p>
          <p className="w-40">{track?.artists[0].name}</p>
        </div>
      </div>

      <div className="flex justify-between items-center ml-auto md:ml-0">
        <p className="hidden md:block w-40">{track?.album.name}</p>
        <p>{convertDuration(track?.duration_ms as number)}</p>
      </div>
    </div>
  );
};

export default Song;
