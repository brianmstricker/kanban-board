import CreateBoard from "./CreateBoard";

const LeftMenu = () => {
 return (
  <aside className="w-[100px] [@media(min-width:500px)]:w-[200px] border-r border-r-neutral-300/80 dark:border-r-neutral-700 h-[calc(100vh-5rem)] sticky left-0 top-0">
   <div className="flex flex-col items-center">
    <CreateBoard />
    <div className="border-t border-t-neutral-300/80 dark:border-t-neutral-700 w-full flex justify-center">
     <span className="mt-3">No boards found :(</span>
    </div>
   </div>
  </aside>
 );
};
export default LeftMenu;
