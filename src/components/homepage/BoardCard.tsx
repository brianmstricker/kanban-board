export type BoardCardProps = {
 board: {
  id: string;
  name: string;
  description?: string;
  fieldNames: string[];
  fieldValues: string[];
  publicAccess: boolean;
 };
};

const BoardCard = ({ board }: BoardCardProps) => {
 console.log(board);
 return (
  <div className="border border-black/10 dark:border-white/10 rounded py-1 px-3 flex flex-col">
   <div className="flex-grow">
    <div className="relative w-fit mx-auto">
     <h2 className="text-xl font-medium">{board.name}</h2>
     <div className="absolute bottom-0 h-[1px] w-full bg-black/50 dark:bg-white/50" />
    </div>
    {board.fieldNames &&
     board.fieldNames.length > 0 &&
     board.fieldNames.map((category: string, i: number) => (
      <div key={i} className="flex justify-between">
       <span className="text-sm opacity-80">{category}</span>
       <span className="text-sm opacity-80">{board.fieldValues[i]}</span>
      </div>
     ))}
   </div>
   <div>
    {board.publicAccess ? (
     <span>Public Access enabled</span>
    ) : (
     <span>Private Access disabled</span>
    )}
   </div>
  </div>
 );
};
export default BoardCard;
