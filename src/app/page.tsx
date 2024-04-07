import { options } from "./api/auth/[...nextauth]/options";
import Center from "./components/Center";
import Sidebar from "./components/Sidebar";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(options);
  console.log("getServerSession",session);
  return (
    <div className="bg-black h-screen overflow-hidden">
      <div className="flex">
        <Sidebar userName={session?.user?.name} />
        <Center />
      </div>
    </div>
  );
}
