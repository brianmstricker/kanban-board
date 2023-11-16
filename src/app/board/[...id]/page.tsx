import { fetchBoard } from "@/lib/actions/board.actions";
import { getUserID } from "@/lib/utils";
import AddTask from "./_components/AddTask";
import AddSection from "./_components/AddSection";

export type Section = {
 _id: string;
 name: string;
 position: number;
 description?: string;
 board: string;
 createdAt: string;
 updatedAt: string;
};

const page = async ({ params }: { params: { id: string } }) => {
 const { id } = params;
 const userID = await getUserID();
 if (!userID) return null;
 const board = await fetchBoard({ boardID: id, userID });
 if (!board) return null;
 console.log(board);
 return (
  <main className="min-h-[calc(100vh-8rem)]">
   <div className="flex h-full">
    <div className="flex-grow p-2 px-8">
     <div className="flex flex-col sm:flex-row items-end relative pb-12 sm:pb-0">
      <AddSection board={board._id.toString()} />
      <h1 className="text-5xl underline underline-offset-4 font-bold mx-auto">
       {board.name}
      </h1>
     </div>
     <p className="text-center opacity-75 mt-2 mb-4">{board.description}</p>
     <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-6 h-full relative">
      {board.sections.map((section: Section) => {
       const { _id, name, position, board, createdAt, updatedAt } = section;
       const newSection = {
        _id: _id.toString(),
        name,
        position,
        createdAt,
        updatedAt,
        board: board.toString(),
       };
       return (
        <div
         key={section._id}
         className="min-h-[50px] bg-black/10 dark:bg-white/10"
        >
         <div>
          <div className="flex items-center pt-1 relative mx-auto w-full md:w-fit justify-center">
           <span className="font-medium text-xl capitalize">
            {section.name}
           </span>
           <AddTask section={newSection} />
          </div>
         </div>
        </div>
       );
      })}
     </div>
    </div>
   </div>
  </main>
 );
};
export default page;
