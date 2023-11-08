"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "../db";
import Board from "../models/board.model";
import Section from "../models/section.model";

type Params = {
 name: string;
 description: string;
 id: string;
};

const defaultSections = [
 { name: "To Do", position: 0 },
 { name: "In Progress", position: 1 },
 { name: "Done", position: 2 },
];

async function createDefaultSections(boardID: string) {
 try {
  dbConnect();
  if (!boardID) throw new Error("No board id provided");
  const sections = await Promise.all(
   defaultSections.map(async (section) => {
    const newSection = await Section.create({
     name: section.name,
     position: section.position,
     board: boardID,
    });
    return newSection;
   })
  );
  return sections;
 } catch (error: any) {
  throw new Error(`Failed to create default sections: ${error.message}`);
 }
}

export async function createBoard({
 name,
 description,
 id,
}: Params): Promise<void> {
 try {
  dbConnect();
  if (!id) throw new Error("No user id provided");
  const boardCount = await Board.countDocuments({ owner: id });
  const newBoard = await Board.create({
   name,
   description,
   owner: id,
   position: boardCount ? boardCount : 0,
  });
  await createDefaultSections(newBoard._id);
  revalidatePath("/");
 } catch (error: any) {
  throw new Error(`Failed to create board: ${error.message}`);
 }
}

export async function fetchBoards({ userID }: { userID: string }) {
 try {
  dbConnect();
  if (!userID) throw new Error("No user id provided");
  const boards = await Board.find({ owner: userID }).sort({ position: 1 });
  if (!boards) return null;
  const boardsWithSections = await Promise.all(
   boards.map(async (board) => {
    const sections = await Section.find({ board: board._id }).sort({
     position: 1,
    });
    // .populate("tasks");
    return { ...board.toObject(), sections };
   })
  );
  return boardsWithSections;
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
  if (!board) return null;
  const sections = await Section.find({ board: boardID }).sort({ position: 1 });
  // .populate("tasks");
  return { ...board[0].toObject(), sections };
 } catch (error: any) {
  throw new Error(`Failed to fetch board: ${error.message}`);
 }
}