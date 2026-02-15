import express, { Request, Response } from "express"
import RequestModel from "../model/requests.js"
import authMiddleware from "../middleware/authMiddleware.js"
import User from "../model/User.js"

interface AuthRequest extends Request {
  userId?: string
}

const router = express.Router()

router.post("/send-request", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { recipientId, skillOffered, skillWanted } = req.body
    const requesterId = req.userId

    if (!recipientId || !skillOffered || !skillWanted) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (requesterId === recipientId) {
      return res.status(400).json({ message: "Cannot send request to yourself" })
    }

    const existingRequest = await RequestModel.findOne({
      requester: requesterId,
      recipient: recipientId,
      status: "pending"
    })

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" })
    }

    const newRequest = await RequestModel.create({
      requester: requesterId,
      recipient: recipientId,
      skillOffered,
      skillWanted,
      status: "pending"
    })

    res.status(201).json({ message: "Request sent successfully", request: newRequest })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/sent-requests", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    
    const requests = await RequestModel.find({ requester: userId })
      .populate("recipient", "name email")
      .sort({ createdAt: -1 })
    
    res.json(requests)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/received-requests", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    
    const requests = await RequestModel.find({ recipient: userId })
      .populate("requester", "name email")
      .sort({ createdAt: -1 })
    
    res.json(requests)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

router.patch("/request/:requestId/respond", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { requestId } = req.params
    const { status } = req.body // "accepted" or "rejected"
    
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }
    
    const request = await RequestModel.findById(requestId)
    
    if (!request) {
      return res.status(404).json({ message: "Request not found" })
    }
    
    if (request.recipient.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }
    
    request.status = status
    await request.save()
    
    res.json({ message: `Request ${status} successfully`, request })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
