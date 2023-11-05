import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
 name: { type: String, required: true },
 description: { type: String },
 owner: { type: String, required: true },
 fieldNames: {
  type: Array,
  required: true,
  default: ["To Do", "In Progress", "Done"],
 },
 fieldValues: { type: Array },
 publicAccess: { type: Boolean, default: false },
});

boardSchema.index({ name: 1, owner: 1 }, { unique: true });
const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);
export default Board;
