import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
 const headersList = headers();
 const { userId } = auth();
 const fullUrl = headersList.get("referer") || "";
 const extension = fullUrl.split("/")[3];
 if (!userId) {
  if (!extension?.includes("sign-in") && !extension?.includes("sign-up")) {
   redirect("/sign-in");
  }
 }
 return <>{children}</>;
};
export default AuthWrapper;
