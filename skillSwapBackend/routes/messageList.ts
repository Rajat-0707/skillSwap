import express, { Request, Response } from "express"
import mongoose from "mongoose"
import Message from "../model/messages.ts"
import authMiddleware from "../middleware/authMiddleware.js"

interface AuthRequest extends Request {
  userId?: string
}

const router = express.Router()

router.get("/conversations", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const myId = req.userId
    if (!myId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const myObjectId = new mongoose.Types.ObjectId(myId)
    
    // Add cache control headers to prevent 304 responses
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    })
    
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: myObjectId }, { receiver: myObjectId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", myObjectId] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $first: "$text" },
          lastTime: { $first: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          userId: { $toString: "$user._id" },
          name: "$user.name",
          lastMessage: 1,
          lastTime: 1
        }
      },
      {
        $sort: { lastTime: -1 }
      }
    ])

    res.json(conversations)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
