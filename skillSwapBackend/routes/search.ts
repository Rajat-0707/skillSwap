import express from "express";
import mongoose from "mongoose";
import User from "../model/User.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const skill = req.query.skill as string | undefined;
    const id = req.query.id as string;

    const userId = new mongoose.Types.ObjectId(id);

    if (!skill) {
      const users = await User.aggregate([
        {
          $match: {
            role: "teacher",
            _id: { $ne: userId } 
          }
        },
        { $sample: { size: 8 } },
        { $project: { passwordHash: 0 } }
      ]);

      return res.json(users);
    }

    const users = await User.find({
      role: "teacher",
      _id: { $ne: userId }, 
      $or: [
        { skillsOffered: { $regex: skill, $options: "i" } },
        { skillsWanted: { $regex: skill, $options: "i" } }
      ]
    })
      .select("-passwordHash")
      .limit(8);

    res.json(users);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

export default router;
