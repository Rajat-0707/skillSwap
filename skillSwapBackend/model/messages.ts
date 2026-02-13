import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({ 
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recieverId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    message:{type: String, required: true},
}, { timestamps: true });

export default mongoose.model("Messages", requestSchema);