import LeftMenu from "@/components/homepage/LeftMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Welcome! - Kanban",
 description: "Kanban boards for managing tasks",
};

export default function Home() {
 return (
  <div className="flex">
   <LeftMenu />
   <main className="pl-2 pt-2 flex-grow overflow-y-hidden text-center">
    <h1 className="text-4xl">Welcome to Kanban!</h1>
    <p className="mt-6">
     You don&apos;t have any boards, create one to get started!
    </p>
   </main>
  </div>
 );
}
