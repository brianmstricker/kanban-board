"use client";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const CreateFieldValue = ({ category }: { category: string }) => {
 const [showModal, setShowModal] = useState(false);
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
    className="absolute right-2 md:-right-12"
   >
    <PlusCircle size={26} />
   </button>
   {showModal && (
    <div
     onClick={closeModal}
     className="fixed inset-0 w-screen h-screen bg-lightBG dark:bg-darkBG xxs:bg-neutral-50/80 xxs:dark:bg-neutral-800/80 z-[90] flex items-center justify-center backdrop-blur-[8px] sm:backdrop-blur-[6px]"
    >
     <div
      id="createModal"
      onClick={(e) => e.stopPropagation()}
      className="xxs:border border-black/50 dark:border-white/50 w-full h-full xxs:w-[85%] xxs:h-auto md:w-[65%] lg:w-[65%]  xl:w-[55%] pb-20 p-3 opening-animation relative bg-lightBG dark:bg-darkBG rounded sm:max-w-[500px] z-[100]"
     >
      modal
     </div>
    </div>
   )}
  </>
 );
};
export default CreateFieldValue;
