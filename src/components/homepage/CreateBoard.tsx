"use client";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
     className="fixed inset-0 w-screen h-screen bg-lightBG dark:bg-darkBG xxs:bg-neutral-50/80 xxs:dark:bg-neutral-800/80 z-50 flex items-center justify-center backdrop-blur-[8px] sm:backdrop-blur-[6px]"
    >
     <div
      id="createModal"
      onClick={(e) => e.stopPropagation()}
      className="xxs:border border-black/50 dark:border-white/50 w-full h-full xxs:w-[85%] xxs:h-[80%] md:w-[65%] md:h-[65%] lg:w-[65%] lg:h-[65%] xl:w-[55%] xl:h-[55%] p-3 opening-animation relative bg-lightBG dark:bg-darkBG rounded"
     >
      <div
       onClick={closeModal}
       className="absolute top-1.5 right-1.5 cursor-pointer"
      >
       <X />
      </div>
      <h2 className="text-center text-3xl mt-4 sm:mt-0">
       Create Your Kanban Board!
      </h2>
      <div className="flex flex-col gap-2 mt-16 lg:mt-8">
       <label htmlFor="boardName" className="ml-1 text-lg">
        Board Name
       </label>
       <Input
        type="text"
        id="boardName"
        placeholder="Board Name"
        className="text-lg border-black/50 dark:border-white/50"
       />
       <label htmlFor="description" className="ml-1 text-lg mt-4">
        Description
       </label>
       <Textarea
        id="description"
        placeholder="Description"
        className="text-lg border-black/50 dark:border-white/50 resize-none"
        rows={5}
       />
       <button className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white rounded p-2 w-1/2 absolute bottom-4 left-1/2 right-1/2 -translate-x-1/2">
        Create
       </button>
      </div>
     </div>
    </div>
   )}
  </>
 );
};
export default CreateBoard;
