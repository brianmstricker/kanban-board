"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "../db";
import Board from "../models/board.model";

type Params = {
 name: string;
 description: string;
 id: string;
};

export async function createBoard({
 name,
 description,
 id,
}: Params): Promise<void> {
 try {
  dbConnect();
  if (!id) throw new Error("No user id provided");
  await Board.create({
   name,
   description,
   owner: id,
  });
  revalidatePath("/");
 } catch (error: any) {
  throw new Error(`Failed to create board: ${error.message}`);
 }
}
