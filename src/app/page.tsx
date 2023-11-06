import BoardCard from "@/components/homepage/BoardCard";
import LeftMenu from "@/components/homepage/LeftMenu";
import { fetchBoards } from "@/lib/actions/board.actions";
import { currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Welcome! - Kanban",
 description: "Kanban boards for managing tasks",
};

export async function Home() {
 const userInfo = await currentUser();
 const id = userInfo?.id;
 if (!id) return null;
 const boards = await fetchBoards({ id });
 return (
  <div className="flex">
   <LeftMenu boards={boards} />
   <main className="pl-2 pt-2 flex-grow overflow-y-hidden text-center">
    <h1 className="text-4xl">Welcome to Kanban!</h1>
    {boards && boards.length === 0 && (
     <p className="mt-6">
      You don&apos;t have any boards, create one to get started!
     </p>
    )}
    {boards && boards.length > 0 && (
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
      {boards.map((board) => (
       <BoardCard key={board.id} board={board} />
      ))}
     </div>
    )}
   </main>
  </div>
 );
}

export default Home;
