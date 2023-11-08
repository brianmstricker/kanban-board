import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: String, required: true },
  publicAccess: { type: Boolean, default: false },
  position: { type: Number },
 },
 { timestamps: true }
);

boardSchema.index({ name: 1, owner: 1 }, { unique: true });
const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);
export default Board;
