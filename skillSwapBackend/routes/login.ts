import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../model/User.js";
import Teacher from "../model/teachers.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const teacher = await Teacher.findOne({ email });

    if (!user && !teacher) {
      return res.status(401).json({ message: "Create an account first" });
    }

    const account: any = user || teacher;

    const ok = await bcrypt.compare(password, account.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const secret: string = process.env.JWT_SECRET as string;

    const token = jwt.sign(
      {
        id: account._id,
        name: account.name,
        email: account.email,
        skillsOffered: account.skillsOffered || [],
        skillsWanted: account.skillsWanted || [],
        role: user ? "student" : "teacher"
      },
      secret,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
