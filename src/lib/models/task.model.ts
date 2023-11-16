import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  description: { type: String },
  position: { type: Number },
  section: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Section",
   required: true,
  },
 },
 { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
