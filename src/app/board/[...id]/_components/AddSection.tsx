"use client";
import { PlusSquare, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
 name: z
  .string()
  .min(1, { message: "Section name must be at least one character." })
  .max(50, { message: "Section name must be 50 characters or less." }),
 description: z
  .string()
  .max(1000, { message: "Task description must be 1000 characters or less." }),
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
  await createSection({
   name: values.name,
   description: values.description,
   userID: userID as string,
   board: board,
  });
  closeModal();
 }
 return (
  <>
   <button
    onClick={() => setShowModal(true)}
    className="flex gap-1 items-center absolute bottom-0 left-0 sm:bottom-auto sm:left-auto mb-4"
   >
    <PlusSquare size={26} />
    <span>Add section</span>
   </button>
   {showModal && (
    <div
     onClick={closeModal}
     className="fixed inset-0 w-screen h-screen bg-neutral-50/80 dark:bg-neutral-800/80 z-[90] flex items-center justify-center backdrop-blur-[8px] sm:backdrop-blur-[6px]"
    >
     <div
      id="createModal"
      onClick={(e) => e.stopPropagation()}
      className="border border-black/50 dark:border-white/50 w-[85%] h-auto md:w-[65%] lg:w-[65%]  xl:w-[55%] pb-4 p-3 opening-animation relative bg-lightBG dark:bg-darkBG rounded sm:max-w-[500px] z-[100]"
     >
      <div
       onClick={closeModal}
       className="absolute top-1.5 right-1.5 cursor-pointer"
      >
       <X />
      </div>
      <h2 className="text-2xl mb-4">Create Section</h2>
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
         control={form.control}
         name="name"
         render={({ field }) => (
          <FormItem>
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
        <FormField
         control={form.control}
         name="description"
         render={({ field }) => (
          <FormItem className="mt-2">
           <FormLabel className="ml-1 text-lg">Description</FormLabel>
           <FormControl>
            <Textarea
             placeholder="Leave a description (optional)"
             {...field}
             className="text-lg border-black/50 dark:border-white/50"
             rows={5}
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
