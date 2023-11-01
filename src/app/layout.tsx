import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Kanban",
 description: "Kanban board for managing tasks",
};

export default async function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const user = await currentUser();
 return (
  <ClerkProvider>
   <html lang="en" suppressHydrationWarning>
    <body className={cn("antialiased min-h-screen", inter.className)}>
     <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
     >
      {!!user && <Header />}
      <div>{children}</div>
     </ThemeProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
