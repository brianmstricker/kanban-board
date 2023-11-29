"use client";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createBoard } from "@/lib/actions/board.actions";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
 name: z
  .string()
  .min(1, { message: "Board name must be at least one character." })
  .max(50, { message: "Board name must be 50 characters or less." }),
 description: z
  .string()
  .optional()
  .or(
   z.string().max(500, {
    message: "Board description must be 500 characters or less.",
   })
  ),
});

const CreateBoard = ({ small }: { small?: boolean }) => {
 const [modal, setShowModal] = useState(false);
 const userInfo = useUser();
 const userID = userInfo?.user?.id;
 const closeModal = () => {
  const modalElement = document.getElementById("createModal");
  if (modalElement) {
   modalElement.classList.remove("opening-animation");
   modalElement.classList.add("closing-animation");
   setTimeout(() => setShowModal(false), 350);
   form.reset();
  }
 };
 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
   description: "",
  },
 });
 async function onSubmit(values: z.infer<typeof formSchema>) {
  await createBoard({
   name: values.name,
   description: values.description as string,
   userID: userID as string,
  });
  closeModal();
 }
 return (
  <>
   <button
    onClick={() => setShowModal(true)}
    className={
     "flex items-center justify-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300 py-4 px-10" +
     (small
      ? " border border-black/10 dark:border-white/10 rounded"
      : " w-full h-full")
    }
   >
    <span className="text-xl font-semibold">Create</span>
    <Plus />
   </button>
   {modal && (
    <div
     onClick={closeModal}
     className="fixed inset-0 w-screen h-screen bg-lightBG dark:bg-darkBG xxs:bg-neutral-50/80 xxs:dark:bg-neutral-800/80 z-[90] flex items-center justify-center backdrop-blur-[8px] sm:backdrop-blur-[6px]"
    >
     <div
      id="createModal"
      onClick={(e) => e.stopPropagation()}
      className="xxs:border border-black/50 dark:border-white/50 w-full h-full xxs:w-[85%] xxs:h-auto md:w-[65%]  lg:w-[65%]  xl:w-[55%] pb-20 p-3 opening-animation relative bg-lightBG dark:bg-darkBG rounded sm:max-w-[800px] z-[100]"
     >
      <div
       onClick={closeModal}
       className="absolute top-1.5 right-1.5 cursor-pointer"
      >
       <X />
      </div>
      <Form {...form}>
       <h2 className="text-center text-3xl mt-4 sm:mt-0">
        Create Your Kanban Board!
       </h2>
       <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-16 lg:mt-8"
       >
        <FormField
         control={form.control}
         name="name"
         render={({ field }) => (
          <FormItem className="w-[90%] mx-auto">
           <FormLabel className="ml-1 text-lg">Board Name</FormLabel>
           <FormControl>
            <Input
             placeholder="Board Name"
             {...field}
             className="text-lg border-black/50 dark:border-white/50"
            />
           </FormControl>
           <FormDescription className="ml-1">
            This is the name of your board
           </FormDescription>
           <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="description"
         render={({ field }) => (
          <FormItem className="mt-4 w-[90%] mx-auto">
           <FormLabel className="ml-1 text-lg">Description</FormLabel>
           <FormControl>
            <Textarea
             placeholder="Board Description"
             {...field}
             className="text-lg border-black/50 dark:border-white/50 resize-none"
             rows={5}
            />
           </FormControl>
           <FormDescription className="ml-1">
            Leave a description of your board.
           </FormDescription>
           <FormMessage />
          </FormItem>
         )}
        />
        <button
         type="submit"
         className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white rounded p-2 w-1/2 absolute bottom-4 left-1/2 right-1/2 -translate-x-1/2 max-w-[300px]"
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
export default CreateBoard;
