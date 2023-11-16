import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
 {
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  description: { type: String },
  position: { type: Number },
  board: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Board",
   required: true,
  },
 },
 { timestamps: true }
);

const Section =
 mongoose.models.Section || mongoose.model("Section", sectionSchema);
export default Section;
