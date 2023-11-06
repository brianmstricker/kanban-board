import CreateBoard from "./CreateBoard";
import Link from "next/link";

type LeftMenuProps = {
 boards: {
  id: string;
  name: string;
  description?: string;
  fieldNames: string[];
  fieldValues: string[];
  publicAccess: boolean;
 }[];
};

const LeftMenu = ({ boards }: LeftMenuProps) => {
 return (
  <aside className="w-[100px] [@media(min-width:500px)]:w-[200px] border-r border-r-neutral-300/80 dark:border-r-neutral-700 h-[calc(100vh-5rem)] sticky left-0 top-0">
   <div className="flex flex-col items-center">
    <CreateBoard />
    <div className="border-t border-t-neutral-300/80 dark:border-t-neutral-700 w-full flex justify-center">
     {boards && boards.length === 0 && (
      <span className="mt-3">No boards found :(</span>
     )}
     {boards && boards.length > 0 && (
      <div className="w-full">
       {boards.map((board) => (
        <Link
         href={`/board/${board.id}`}
         key={board.id}
         className="w-full block text-center py-4 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300 border-b border-b-neutral-300/80 dark:border-b-neutral-700"
        >
         <span>{board.name}</span>
        </Link>
       ))}
      </div>
     )}
    </div>
   </div>
  </aside>
 );
};
export default LeftMenu;
