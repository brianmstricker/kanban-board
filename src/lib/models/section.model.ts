import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  description: { type: String },
  position: { type: Number },
  board: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Board",
  },
  tasks: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
   },
  ],
 },
 { timestamps: true }
);

const Section =
 mongoose.models.Section || mongoose.model("Section", sectionSchema);
export default Section;
