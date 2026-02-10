import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  skillsOffered: [{ type: String, required: true }],
  skillsWanted: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("teachers", teacherSchema);
