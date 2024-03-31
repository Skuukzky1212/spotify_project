import { ClientSafeProvider, getProviders } from "next-auth/react";
import SignIn from "../components/SignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Image from "next/image";
import spotifyLogo from "../assets/spotify-logo.png";

export default async function Login() {
  const session = await getServerSession();
  const providers = await getProviders();
  const { name: providerName, id: providerId } = providers?.spotify as ClientSafeProvider;
  if (!providers) {
    return <div>Sign in is not available</div>;
  }
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="mb-6">
        <Image src={spotifyLogo} alt="Spotify logo" width="200" height="200" />
      </div>
      <SignIn providerName={providerName} providerId={providerId} />
    </div>
  );
}
