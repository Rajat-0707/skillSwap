import express from "express";
import User from "../model/User.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { skill } = req.query as { skill?: string };

    if (!skill) {
      const users = await User.aggregate([
        { $match: { role: "teacher" } },  
        { $sample: { size: 8 } },
        { $project: { passwordHash: 0 } }
      ]);

      return res.json(users);
    }

    // If skill search
    const users = await User.find({
      role: "teacher",  
       $or: [
        { skillsOffered: { $regex: skill, $options: "i" } },
        { skillsWanted: { $regex: skill, $options: "i" } }
      ]
    })
      .select("-passwordHash")
      .limit(8);

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

export default router;
