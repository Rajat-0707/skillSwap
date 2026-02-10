import express from "express"
import dotenv from "dotenv"
import connectDB from "../db/db.js"
import signupRoutes from "../routes/signup.js"
import loginRoutes from "../routes/login.js"
import cors from "cors"
import authMiddleware from "../middleware/authMiddleware.js"
import User from "../model/User.js"
import Teacher from "../model/teachers.js"
import search from "../routes/search.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())

app.use(signupRoutes)
app.use(loginRoutes)
app.use(search)

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
