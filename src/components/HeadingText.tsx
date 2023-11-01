import { cn } from "@/lib/utils";

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement>;
const HeadingText = ({ className }: HeaderProps) => {
 return (
  <h1
   className={cn(
    "text-6xl mb-8 font-bold tracking-wide bg-gradient-to-br from-violet-500 dark:from-teal-400 from-25% to-teal-700 dark:to-violet-600 bg-clip-text text-transparent",
    className
   )}
  >
   Kanban
  </h1>
 );
};
export default HeadingText;
