import { currentUser } from "@clerk/nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export async function getUserID() {
 const userInfo = await currentUser();
 const userID = userInfo?.id;
 if (!userID) return null;
 return userID;
}
