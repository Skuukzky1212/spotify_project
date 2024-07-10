import { useEffect } from "react";
import { ExtendedSession, TokenError } from "../types";
import { signIn, useSession  } from "next-auth/react";
import { spotifyApi } from "../config/spotify";

const useSpotify = () => {
	const { data: session } = useSession()

	useEffect(() => {
		if (!session) return

		// if refresh token fails, redirect to login
		if (
			(session as ExtendedSession).error === TokenError.RefreshAccessTokenError
		) {
			signIn()
		}
		// use api
		spotifyApi.setAccessToken((session as ExtendedSession).accessToken)
	}, [session])

	return spotifyApi
}

export default useSpotify
