import Link from "next/link";
import HeadingText from "./HeadingText";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
 return (
  <nav className="h-20 padding border-b border-b-neutral-300/80 dark:border-b-neutral-700 flex items-center justify-between">
   <Link href={"/"}>
    <HeadingText className="text-4xl sm:text-5xl mb-0" />
   </Link>
   <ThemeToggle />
  </nav>
 );
};
export default Header;
