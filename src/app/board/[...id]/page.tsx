import { fetchBoard } from "@/lib/actions/board.actions";
import { getUserID } from "@/lib/utils";
import CreateFieldValue from "./_components/CreateTask";

type Section = {
 _id: string;
 name: string;
 description?: string;
 fieldNames: string[];
 fieldValues: string[];
 createdAt: string;
 updatedAt: string;
};

const page = async ({ params }: { params: { id: string } }) => {
 const { id } = params;
 const userID = await getUserID();
 if (!userID) return null;
 const board = await fetchBoard({ boardID: id, userID });
 return (
  <main className="min-h-[calc(100vh-8rem)]">
   <div className="flex h-full">
    <div className="flex-grow p-2 px-8">
     <h1 className="text-5xl text-center mb-4 underline underline-offset-4 font-bold">
      {board.name}
     </h1>
     <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-6 h-full relative">
      {board.sections.map((section: Section) => (
       <div
        key={section._id}
        className="min-h-[50px] bg-black/10 dark:bg-white/10"
       >
        <div>
         <div className="flex items-center pt-1 relative mx-auto w-full md:w-fit justify-center">
          <span className="font-medium text-xl capitalize">{section.name}</span>
          <CreateFieldValue section={section.name} />
         </div>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>
  </main>
 );
};
export default page;
