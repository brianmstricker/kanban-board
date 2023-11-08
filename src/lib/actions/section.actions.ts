"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "../db";
import Section from "../models/section.model";

type Params = {
 name: string;
 description?: string;
 board: string;
 userID: string;
};

export async function createSection({
 name,
 description,
 board,
 userID,
}: Params) {
 try {
  dbConnect();
  if (!userID) throw new Error("No user id provided");
  if (!board) throw new Error("No board id provided");
  const sectionCount = await Section.countDocuments({ board });
  const newSection = await Section.create({
   name,
   description,
   board,
   position: sectionCount ? sectionCount : 0,
  });
  revalidatePath(`/board/${board}`);
 } catch (error: any) {
  throw new Error(`Failed to create section: ${error.message}`);
 }
}
