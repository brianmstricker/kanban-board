"use client";
import { PlusSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { createSection } from "@/lib/actions/section.actions";

const formSchema = z.object({
 name: z
  .string()
  .min(1, { message: "Section name must be at least one character." })
  .max(50, { message: "Section name must be 50 characters or less." }),
});

const AddSection = ({ board }: { board: string }) => {
 const [showModal, setShowModal] = useState(false);
 const userInfo = useUser();
 const userID = userInfo?.user?.id;
 const closeModal = () => {
  const modalElement = document.getElementById("createModal");
  if (modalElement) {
   modalElement.classList.remove("opening-animation");
   modalElement.classList.add("closing-animation");
   setTimeout(() => setShowModal(false), 350);
  }
 };
 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
  },
 });
 async function onSubmit(values: z.infer<typeof formSchema>) {
  await createSection({
   name: values.name,
   userID: userID as string,
   board: board,
  });
  closeModal();
 }
 return (
  <>
   <button
    onClick={() => setShowModal(true)}
    className="flex gap-1 items-center absolute"
   >
    <PlusSquare size={26} />
    <span>Add section</span>
   </button>
   {showModal && (
    <div
     onClick={closeModal}
     className="fixed inset-0 w-screen h-screen bg-lightBG dark:bg-darkBG xxs:bg-neutral-50/80 xxs:dark:bg-neutral-800/80 z-[90] flex items-center justify-center backdrop-blur-[8px] sm:backdrop-blur-[6px]"
    >
     <div
      id="createModal"
      onClick={(e) => e.stopPropagation()}
      className="xxs:border border-black/50 dark:border-white/50 w-full h-full xxs:w-[85%] xxs:h-auto md:w-[65%] lg:w-[65%]  xl:w-[55%] pb-4 p-3 opening-animation relative bg-lightBG dark:bg-darkBG rounded sm:max-w-[500px] z-[100]"
     >
      <h2 className="text-2xl mb-4">Create Section</h2>
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
         control={form.control}
         name="name"
         render={({ field }) => (
          <FormItem className="w-[90%]">
           <FormLabel className="ml-1 text-lg">Section Name</FormLabel>
           <FormControl>
            <Input
             placeholder="Section Name"
             {...field}
             className="text-lg border-black/50 dark:border-white/50"
            />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
        <button
         type="submit"
         className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white rounded p-2 w-1/2 max-w-[300px] mx-auto mt-4"
        >
         Create
        </button>
       </form>
      </Form>
     </div>
    </div>
   )}
  </>
 );
};
export default AddSection;
