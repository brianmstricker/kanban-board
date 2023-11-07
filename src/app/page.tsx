import BoardCard from "@/components/homepage/BoardCard";
import LeftMenu from "@/components/homepage/LeftMenu";
import { fetchBoards } from "@/lib/actions/board.actions";
import { getUserID } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Welcome! - Kanban",
 description: "Kanban boards for managing tasks",
};

export async function Home() {
 const userID = await getUserID();
 if (!userID) return null;
 const boards = await fetchBoards({ userID });
 return (
  <div className="flex">
   <LeftMenu boards={boards} />
   <main className="p-2 flex-grow">
    <h1 className="text-5xl text-center">Welcome to Kanban!</h1>
    {boards && boards.length === 0 && (
     <p className="mt-6">
      You don&apos;t have any boards, create one to get started!
     </p>
    )}
    {boards && boards.length > 0 && (
     <>
      <p className="mt-4 opacity-75 text-center">Your boards:</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-6">
       {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
       ))}
      </div>
     </>
    )}
   </main>
  </div>
 );
}

export default Home;
