"use client";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import BoardCard from "./BoardCard";
import { StrictModeDroppable } from "../StrictModeDroppable";

const BoardGrid = ({ boards }: { boards: any }) => {
 function handleDragEnd(result: DropResult) {
  console.log(result);
 }
 return (
  <DragDropContext onDragEnd={handleDragEnd}>
   <StrictModeDroppable
    droppableId="boards"
    direction="horizontal"
    type="COLUMN"
   >
    {(provided, snapshot) => (
     <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 gap-6"
      ref={provided.innerRef}
      // style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "" }}
      {...provided.droppableProps}
     >
      {boards.map((board: any, index: number) => (
       <Draggable draggableId={board._id} index={index} key={board._id}>
        {(provided) => (
         <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
         >
          <BoardCard board={board} />
         </div>
        )}
       </Draggable>
      ))}
      {provided.placeholder}
     </div>
    )}
   </StrictModeDroppable>
  </DragDropContext>
 );
};
export default BoardGrid;
