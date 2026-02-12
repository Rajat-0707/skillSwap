import mongoose from "mongoose"; 
import User from "./User.js";

const requestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  skillOffered: { type: String, required: true },
  skillWanted: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);