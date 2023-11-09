import { CheckSquare, XSquare } from "lucide-react";

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
  }[];
 };
};

const BoardCard = ({ board }: BoardCardProps) => {
 return (
  <div className="border border-black/10 dark:border-white/10 rounded py-1 px-4 flex flex-col">
   <div className="flex-grow">
    <div className="relative w-fit mx-auto">
     <h2 className="text-xl font-medium mb-2">{board.name}</h2>
     <div className="absolute bottom-0 h-[1px] w-full bg-black/50 dark:bg-white/50" />
    </div>
    {board.sections &&
     board.sections.length > 0 &&
     board.sections.map((section) => (
      <div key={section._id} className="mt-1">
       <span className="text-sm opacity-80">{section.name}</span>
      </div>
     ))}
   </div>
   <div className="mt-2">
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
  </div>
 );
};
export default BoardCard;
