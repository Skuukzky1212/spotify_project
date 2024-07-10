import Center from "./components/Center";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";

export default async function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <div className="flex">
        <Sidebar />
        <Center />
      </div>
      <div className="sticky bottom-0 text-white">
        <Player />
      </div>
    </div>
  );
}
