import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"
import User from "../model/User.js"
import dotenv from "dotenv"

dotenv.config()


const router = express.Router()

router.post("/signup", async (req, res) => {  
    const { name, email, password , skillsOffered, skillsWanted} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, passwordHash, skillsOffered, skillsWanted });
    try {
        await newUser.save();
    } catch (err) {
        return res.status(500).json({ message: "Error saving user in db" });
    }
    res.status(201).json({ message: "User registered successfully" });

});

export default router;