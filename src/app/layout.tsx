import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Kanban",
 description: "Kanban board for managing tasks",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <ClerkProvider>
   <html lang="en">
    <body className={cn("antialiased min-h-screen", inter.className)}>
     <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
     >
      {children}
     </ThemeProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
