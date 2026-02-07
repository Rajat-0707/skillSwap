import express from "express"
import dotenv from "dotenv"
import connectDB from "../db/db.js"
import signupRoutes from "../routes/signup.js"
import loginRoutes from "../routes/login.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(signupRoutes)
app.use(loginRoutes)

app.get("/", (_req, res) => {
  res.send("API running 🚀")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
