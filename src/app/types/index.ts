import { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}

export enum TokenError {
  RefreshAccessTokenError = "RefreshAccessTokenError",
}

export interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error?: TokenError;
}

export interface ExtendedSession extends Session {
  accessToken: ExtendedToken["accessToken"];
  error: ExtendedToken["error"];
}

export interface PlaylistContextState {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylistId: string | null;
  selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null;
}

export interface IPlaylistContext {
  playlistContextState: PlaylistContextState;
  updatePlaylistContextState: (
    updatedObj: Partial<PlaylistContextState>
  ) => void;
}
