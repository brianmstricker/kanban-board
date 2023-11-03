import HeadingText from "@/components/HeadingText";
import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Sign up - Kanban",
 description: "Sign up to create your own Kanban Boards!",
};

const page = () => {
 return (
  <main className="flex flex-col items-center justify-center w-full h-screen">
   <HeadingText />
   <SignUp />
   <p className="mt-8 opacity-50 text-sm">
    Sign up and create your own Kanban Boards!
   </p>
  </main>
 );
};
export default page;
