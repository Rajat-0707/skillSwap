import express from "express"
import dotenv from "dotenv"
import connectDB from "../db/db.js"
import signupRoutes from "../routes/signup.js"
import loginRoutes from "../routes/login.js"
import cors from "cors"
import authMiddleware from "../middleware/authMiddleware.js"
import User from "../model/User.js"
import search from "../routes/search.js"
import updateProfile from "../routes/updateProfile.js"
import viewProfile from "../routes/viewProfile.js"
import http from "http"
import { Server, Socket } from "socket.io"
import Message from "../model/messages.js"
import jwt from "jsonwebtoken"
import messagesList from "../routes/messageList.js"
import messagesRoute from "../routes/messages.js"
import requestsRoute from "../routes/requests.js"

interface JwtPayload {
id: string
}

interface AuthSocket extends Socket {
userId?: string
}

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigin = "https://skill-swap-orpin-chi.vercel.app"

app.use(cors({
origin: allowedOrigin,
credentials: true
}))

app.use(express.json())

app.use(signupRoutes)
app.use(loginRoutes)
app.use(search)
app.use(updateProfile)
app.use(viewProfile)
app.use(messagesList)
app.use(messagesRoute)
app.use(requestsRoute)

app.get("/", (_req, res) => {
res.send("API running 🚀")
})

app.get("/me", authMiddleware, async (req: any, res) => {
try {
const user = await User.findById(req.userId).select("-password")
if (!user) {
return res.status(404).json({ message: "User not found" })
}
res.json(user)
} catch {
res.status(500).json({ message: "Server error" })
}
})

app.post("/logout", (_req, res) => {
res.status(200).json({ message: "Logged out successfully" })
})

const server = http.createServer(app)

const io = new Server(server, {
cors: {
origin: allowedOrigin,
methods: ["GET", "POST"],
credentials: true
}
})

io.use((socket: AuthSocket, next) => {
try {
const token = socket.handshake.auth?.token
if (!token) return next(new Error("Unauthorized"))
const decoded = jwt.verify(
token,
process.env.JWT_SECRET as string
) as JwtPayload
socket.userId = decoded.id
next()
} catch {
next(new Error("Unauthorized"))
}
})

io.on("connection", (socket: AuthSocket) => {
const userId = socket.userId as string
socket.join(userId)

socket.on("privateMessage", async ({ toUserId, message }) => {
try {
const fromUserId = socket.userId as string
const newMessage = await Message.create({
sender: fromUserId,
receiver: toUserId,
text: message
})


  const payload = {
    _id: newMessage._id,
    sender: fromUserId,
    receiver: toUserId,
    text: message,
    createdAt: newMessage.createdAt
  }

  io.to(toUserId).emit("receiveMessage", payload)
  io.to(fromUserId).emit("receiveMessage", payload)
} catch (err) {
  console.error(err)
}

})
})

server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
