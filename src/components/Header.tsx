import Link from "next/link";
import HeadingText from "./HeadingText";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import UserButtonClient from "./UserButtonClient";

const Header = () => {
 return (
  <nav className="h-20 padding border-b border-b-neutral-300/80 dark:border-b-neutral-700 flex items-center justify-between">
   <Link href={"/"} className="flex items-center gap-1">
    <Image
     src="/logo.png"
     alt="logo"
     width={40}
     height={40}
     className="my-1 sm:my-3"
    />
    <HeadingText className="text-4xl sm:text-5xl mb-0" />
   </Link>
   <div className="flex gap-4 items-center">
    <ThemeToggle />
    <UserButtonClient />
   </div>
  </nav>
 );
};
export default Header;
