import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
 {
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  description: { type: String, maxlength: 500 },
  owner: { type: String, required: true },
  publicAccess: { type: Boolean, default: false },
  position: { type: Number },
 },
 { timestamps: true }
);

boardSchema.index({ name: 1, owner: 1 }, { unique: true });
const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);
export default Board;
