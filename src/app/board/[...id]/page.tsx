import { fetchBoard } from "@/lib/actions/board.actions";
import { getUserID } from "@/lib/utils";
import AddTask from "./_components/AddTask";
import AddSection from "./_components/AddSection";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
 params,
}: {
 params: { id: string };
}): Promise<Metadata> {
 const { id } = params;
 const board = await fetchBoard({ boardID: id });
 if (!board)
  return {
   title: "Board not found - Kanban",
   description: "Kanban boards for managing tasks",
  };
 return {
  title: `${board.name} - Kanban`,
  description: "Kanban boards for managing tasks",
 };
}

export type Task = {
 _id: string;
 name: string;
 description?: string;
 createdAt: string;
 updatedAt: string;
};

export type Section = {
 _id: string;
 name: string;
 position: number;
 description?: string;
 board: string;
 createdAt: string;
 updatedAt: string;
 tasks?: Task[];
};

const page = async ({ params }: { params: { id: string } }) => {
 const { id } = params;
 const userID = await getUserID();
 if (!userID) return null;
 const board = await fetchBoard({ boardID: id, userID });
 if (!board) return null;
 return (
  <main className="min-h-[calc(100vh-8rem)]">
   <div className="flex h-full">
    <div className="flex-grow p-2 px-8">
     <div className="flex flex-col sm:flex-row items-end relative pb-12 sm:pb-0">
      <AddSection board={board._id.toString()} />
      <div className="text-center mx-auto">
       <span className="text-5xl underline underline-offset-4 font-bold">
        {board.name}
       </span>
       <p className="text-center opacity-75 mt-2 mb-4 max-w-[300px]">
        {board.description}
       </p>
      </div>
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
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
         className="rounded pb-6 bg-black/5 dark:bg-white/10 min-h-[100px]"
        >
         <div>
          <div className="flex items-center pt-1.5 relative mx-auto w-full md:w-fit justify-center">
           <span className="font-bold text-xl sm:text-3xl capitalize px-2">
            {section.name}
           </span>
           <AddTask section={newSection} />
          </div>
          <div className="max-w-[90%] mx-auto opacity-75 mt-1">
           {section.description}
          </div>
          <div className="w-full h-[1px] mt-2 mb-4 bg-black/10 dark:bg-white/10" />
          {section.tasks &&
           section.tasks.map((task) => {
            return (
             <div
              key={task._id}
              className="bg-white dark:bg-black/10 rounded shadow-md px-3 py-4 m-2 cursor-pointer transition-colors duration-300 hover:bg-black/10 dark:hover:bg-white/10 flex justify-center items-center"
             >
              <div className="flex justify-between items-center w-full">
               <span className="font-extrabold text-lg sm:text-xl capitalize line-clamp-5">
                {task.name}
               </span>
               <span className="text-xs sm:text-sm opacity-50">
                {new Date(task.createdAt).toLocaleDateString()}
               </span>
              </div>
              <p className="text-sm opacity-75 line-clamp-3 mt-1">
               {task.description}
              </p>
             </div>
            );
           })}
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
