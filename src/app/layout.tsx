import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PlaylistContextProvider from "./contexts/PlaylistContext";
import { MySessionProvider } from "./hooks/SessionProvider";
import SongContextProvider from "./contexts/SongContext";

// Load Google Inter font
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the app
export const metadata: Metadata = {
  title: "My Spotify",
  description: "My Spotify v1",
};

// RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-google-analytics-opt-out="">
      <body suppressHydrationWarning={true} className={inter.className}>
        <MySessionProvider>
          <PlaylistContextProvider>
            <SongContextProvider>{children}</SongContextProvider>
          </PlaylistContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
