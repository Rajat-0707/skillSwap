import express, { Request, Response } from "express"
import Message from "../model/messages.ts"
import authMiddleware from "../middleware/authMiddleware.js"

interface AuthRequest extends Request {
  userId?: string
}

const router = express.Router()

router.get(
  "/messages/:receiverId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const myId = req.userId
      const { receiverId } = req.params

      if (!myId || !receiverId) {
        return res.status(400).json({ message: "Missing user or receiver id" })
      }

      const messages = await Message.find({
        $or: [
          { sender: myId, receiver: receiverId },
          { sender: receiverId, receiver: myId }
        ]
      }).sort({ createdAt: 1 })

      res.json(messages)
    } catch (err) {
      res.status(500).json({ message: "Server error" })
    }
  }
)

export default router
