import express from "express"
import dotenv from "dotenv"
import connectDB from "../db/db.js"
import signupRoutes from "../routes/signup.js"
import loginRoutes from "../routes/login.js"
import cors from "cors"


dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json())

app.use(signupRoutes)
app.use(loginRoutes)

app.get("/", (_req, res) => {
  res.send("API running 🚀")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
