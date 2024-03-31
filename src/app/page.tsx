import Center from "./components/Center";
import Sidebar from "./components/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="bg-black h-screen overflow-hidden">
      <div className="flex">
        <Sidebar userName={session?.user?.name} />
        <Center />
      </div>
    </div>
  );
}
