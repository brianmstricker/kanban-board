import LeftMenu from "@/components/homepage/LeftMenu";

export default function Home() {
 return (
  <div className="flex">
   <LeftMenu />
   <main className="pl-2 pt-2 flex-grow overflow-y-hidden text-center">
    <h1 className="text-4xl">Welcome to Kanban!</h1>
    <p className="mt-4">
     You currently don&apos;t have any boards, create one to get started!
    </p>
   </main>
  </div>
 );
}
