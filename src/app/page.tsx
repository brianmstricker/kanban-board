import BoardGrid from "@/components/homepage/BoardGrid";
import CreateBoard from "@/components/homepage/CreateBoard";
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
 const boardsFetch = await fetchBoards({ userID });
 if (!boardsFetch || (boardsFetch && boardsFetch.length === 0))
  return (
   <div className="flex items-center justify-center w-screen h-[85vh]">
    <main className="p-2 md:px-4">
     <h1 className="text-5xl text-center mt-2">Welcome to Kanban!</h1>
     <p className="mt-6 text-center">
      You don&apos;t have any boards, create one to get started!
     </p>
     <div className="mx-auto w-fit mt-4">
      <CreateBoard small />
     </div>
    </main>
   </div>
  );
 const boards = JSON.parse(JSON.stringify(boardsFetch));
 return (
  <div className="flex">
   <LeftMenu boards={boards} />
   <main className="p-2 md:px-4 flex-grow">
    <h1 className="text-5xl text-center">Welcome back to Kanban!</h1>
    {boards && boards.length > 0 && (
     <>
      <p className="mt-2 opacity-75 text-center">Your boards:</p>
      <BoardGrid boards={boards} />
     </>
    )}
   </main>
  </div>
 );
}

export default Home;
