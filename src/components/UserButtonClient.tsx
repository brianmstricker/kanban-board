"use client";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const UserButtonClient = () => {
 const { theme } = useTheme();
 const [mounted, setMounted] = useState(false);
 useEffect(() => {
  setMounted(true);
 }, []);
 if (!mounted)
  return <div className="w-8 h-8 bg-gray-300/50 rounded-full animate-pulse" />;
 return (
  <div className="w-8 h-8">
   <UserButton
    afterSignOutUrl="/sign-in"
    afterMultiSessionSingleSignOutUrl="/sign-in"
    appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
   />
  </div>
 );
};
export default UserButtonClient;
