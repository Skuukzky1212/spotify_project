"use client";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
interface providers {
  providerId: LiteralUnion<BuiltInProviderType, string>;
}
const SignIn = ({ providerId }: providers) => {
  return (
    <button
      className="text-[16px] font-[500] bg-[#18d860] border-2 border-[transparent] text-white px-5 py-4 rounded-full hover:border-white transition-all"
      onClick={() => {
        signIn(providerId, { callbackUrl: "/" });
      }}
    >
      Login with Spotify!
    </button>
  );
};

export default SignIn;
