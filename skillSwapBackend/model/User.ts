import mongoose, { Schema, Document } from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    skillsOffered: [{ type: String }],
    skillsWanted: [{ type: String }],
    location: { type: String },
    education: { type: String },
    bio: { type: String },
    role: { type: String, enum: ["teacher", "student"], default: "teacher" }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);



export default User;