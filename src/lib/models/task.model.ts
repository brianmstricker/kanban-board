import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  position: { type: Number },
  section: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Section",
  },
 },
 { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
