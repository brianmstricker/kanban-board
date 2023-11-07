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

export async function fetchBoards({ userID }: { userID: string }) {
 try {
  dbConnect();
  if (!userID) throw new Error("No user id provided");
  const boards = await Board.find({ owner: userID });
  return boards;
 } catch (error: any) {
  throw new Error(`Failed to fetch boards: ${error.message}`);
 }
}

export async function fetchBoard({
 boardID,
 userID,
}: {
 boardID: string;
 userID: string;
}) {
 try {
  dbConnect();
  if (!userID || !boardID) throw new Error("No user id or board id provided");
  const board = await Board.find({ _id: boardID, owner: userID });
  return board;
 } catch (error: any) {
  throw new Error(`Failed to fetch board: ${error.message}`);
 }
}
