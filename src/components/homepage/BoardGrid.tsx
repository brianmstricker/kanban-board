"use client";
import { DragDropContext } from "react-beautiful-dnd";

const BoardGrid = ({ children }: { children: React.ReactNode }) => {
 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 gap-6">
   {children}
  </div>
 );
};
export default BoardGrid;
