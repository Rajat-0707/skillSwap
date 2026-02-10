import express from "express";
import Teacher from "../model/teachers.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { skill } = req.query as { skill?: string };

    if (!skill) {
      const users = await Teacher.aggregate([
        { $sample: { size: 8 } },
        { $project: { passwordHash: 0 } }
      ]);
      return res.json(users);
    }

    const users = await Teacher.find({
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
