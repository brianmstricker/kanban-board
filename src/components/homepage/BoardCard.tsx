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
 // console.log(board);
 return (
  <div>
   <h2>{board.name}</h2>
  </div>
 );
};
export default BoardCard;
