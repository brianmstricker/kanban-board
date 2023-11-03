import HeadingText from "@/components/HeadingText";
import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Sign in - Kanban",
 description: "Sign in to create your own Kanban Boards!",
};

const page = () => {
 return (
  <main className="flex flex-col items-center justify-center w-full h-screen">
   <HeadingText />
   <SignIn />
   <p className="mt-8 opacity-50 text-sm">
    Sign in to create your own Kanban Boards!
   </p>
  </main>
 );
};
export default page;
