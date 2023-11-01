const LeftMenu = () => {
 return (
  <aside className="w-[100px] [@media(min-width:500px)]:w-[200px] border-r border-r-neutral-300/80 dark:border-r-neutral-700 h-[calc(100vh-5rem)] sticky left-0 top-0">
   <div className="pt-2 flex justify-center text-2xl font-bold border-b pb-2 border-b-neutral-300/80 dark:border-b-neutral-700">
    Your Boards
   </div>
  </aside>
 );
};
export default LeftMenu;
