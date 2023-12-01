import { CheckSquare, XSquare } from "lucide-react";
import Link from "next/link";

export type BoardCardProps = {
 board: {
  _id: string;
  name: string;
  description?: string;
  owner: string;
  publicAccess: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
  sections: {
   _id: string;
   name: string;
   position: number;
   description?: string;
   board: string;
   createdAt: string;
   updatedAt: string;
   tasks?: {
    _id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
   }[];
  }[];
 };
};

const BoardCard = ({ board }: BoardCardProps) => {
 return (
  <Link
   href={"/board/" + board._id}
   className="border border-black/10 dark:border-white/10 rounded py-1 px-4 flex flex-col transition-all duration-300 hover:border-black/30 dark:hover:border-white/30 h-full"
  >
   <div className="flex-grow">
    <div className="relative w-fit mx-auto">
     <h2 className="text-xl font-medium mb-2">{board.name}</h2>
     <div className="absolute bottom-0 h-[1px] w-full bg-black/50 dark:bg-white/50" />
    </div>
    {board.sections && board.sections.length > 0 && (
     <div className="flex flex-col justify-between h-[85%]">
      {board.sections.map((section) => (
       <div key={section._id} className="mt-3">
        <span className="opacity-90 font-bold">{section.name}:&nbsp;</span>
        {section.tasks && (
         <ul>
          {section.tasks.map((task) => (
           <li key={task._id} className="text-sm opacity-70 ml-3 list-disc">
            {task.name}
           </li>
          ))}
         </ul>
        )}
       </div>
      ))}
     </div>
    )}
   </div>
   <div className="mt-8">
    {board.publicAccess ? (
     <div>
      <CheckSquare color="green" />
      <span className="text-sm">Public Access enabled</span>
     </div>
    ) : (
     <div className="flex items-center gap-1">
      <XSquare color="red" />
      <span className="text-sm">Private Access disabled</span>
     </div>
    )}
   </div>
  </Link>
 );
};
export default BoardCard;
