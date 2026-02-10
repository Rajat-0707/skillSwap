import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"
import User from "../model/User.js"
import dotenv from "dotenv"
import teacher from "../model/teachers.js"

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
    const newUser = new User({ name, email, passwordHash, skillsWanted });
    const newTeacher = new teacher({ name, email, passwordHash, skillsOffered, skillsWanted });

    try {
        if(skillsOffered.length === 0){
        await newUser.save();
    } else {
        await newTeacher.save();
    }
    } catch (err) {
        return res.status(500).json({ message: "Error saving user in db" });
    }
    res.status(201).json({ message: "User registered successfully" });

});

export default router;