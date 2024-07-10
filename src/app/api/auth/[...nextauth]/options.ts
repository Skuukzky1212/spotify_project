import type { CallbacksOptions, NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { scopes, spotifyApi } from "../../../config/spotify";
import { ExtendedToken, TokenError } from "@/app/types";

const refreshAccessToken = async (
  token: ExtendedToken
): Promise<ExtendedToken> => {
  try {
    // old token
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    // refresh to get new token
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("Refreshed tokens are: ", refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      refreshToken: refreshedToken.refresh_token || token.refreshToken, // refresh token exsit for along time
      accessTokenExpiresAt: Date.now() + refreshedToken.expires_in * 1000,
    };
  } catch (error) {
    console.log("Error", error);
    return {
      ...token, 
      error: TokenError.RefreshAccessTokenError,
    }
  }
};

const jwtCallBack: CallbacksOptions["jwt"] = async ({ token, account, user }) => {
  let ExtendedToken: ExtendedToken;

  // if user 1st login
  if (user && account) {
    ExtendedToken = {
      ...token,
      user,
      accessToken: account.access_token as string,
      refreshToken: account.refresh_token as string,
      accessTokenExpiresAt: (account.expires_at as number) * 1000, // s covert to ms
    };
    console.log("First time login, extented token now: ", ExtendedToken);
    return ExtendedToken;
  }
  
  // if subsequent requests (exp check auth session), return token (must not expire!!!!)
  if (Date.now() + 5000 < (token as ExtendedToken).accessTokenExpiresAt) {
    console.log("Token still valid! return extended token: ", token);
    return token;
  }
  // else, token has expire, please refresh it!
  return await refreshAccessToken(token as ExtendedToken);
};

const sessionCallBack: CallbacksOptions['session'] = async ({session, token}) => {
  session.accessToken = (token as ExtendedToken).accessToken as string;
  session.error = (token as ExtendedToken).error as string;
  return session;
}

export const options: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: jwtCallBack,
    session: sessionCallBack,
  },
};
