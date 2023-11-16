"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "../db";
import Task from "../models/task.model";

type Params = {
 name: string;
 description?: string;
 section: string;
 userID: string;
 board: string;
};

export async function createTask({
 name,
 description,
 section,
 userID,
 board,
}: Params) {
 try {
  dbConnect();
  if (!userID) throw new Error("No user id provided");
  if (!section) throw new Error("No section id provided");
  const taskCount = await Task.countDocuments({ section });
  await Task.create({
   name,
   description,
   section,
   position: taskCount ? taskCount : 0,
  });
  revalidatePath(`/board/${board}`);
 } catch (error: any) {
  throw new Error(`Failed to create section: ${error.message}`);
 }
}
