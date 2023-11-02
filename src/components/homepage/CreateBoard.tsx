"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

const CreateBoard = () => {
 const [modal, setShowModal] = useState(false);
 const closeModal = () => {
  const modalElement = document.getElementById("createModal");
  if (modalElement) {
   modalElement.classList.remove("opening-animation");
   modalElement.classList.add("closing-animation");
   setTimeout(() => setShowModal(false), 350);
  }
 };
 return (
  <>
   <button
    onClick={() => setShowModal(true)}
    className="flex items-center justify-center gap-2 w-full h-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300 py-3"
   >
    <span className="text-xl font-semibold">Create</span>
    <Plus />
   </button>
   {modal && (
    <div
     onClick={closeModal}
     className="fixed inset-0 w-screen h-screen bg-neutral-50/80 dark:bg-neutral-800/80 z-50 flex items-center justify-center backdrop-blur-[1px]"
    >
     <div
      id="createModal"
      onClick={(e) => e.stopPropagation()}
      className="border border-black dark:border-white w-3/4 h-1/2 md:w-1/2 md:h-1/2 p-2 opening-animation"
     >
      <h2 className="text-center text-2xl">Create a Kanban Board!</h2>
     </div>
    </div>
   )}
  </>
 );
};
export default CreateBoard;
