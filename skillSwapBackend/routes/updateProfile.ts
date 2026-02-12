import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const router = express.Router();

router.post("/updateProfile", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const userId = decoded.id;

    const {
      name,
      skillsOffered = [],
      skillsWanted,
      location,
      education,
      bio
    } = req.body;

    const role =
      Array.isArray(skillsOffered) && skillsOffered.length > 0
        ? "teacher"
        : "student";

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        skillsOffered,
        skillsWanted,
        location,
        education,
        bio,
        role
      },
      { new: true }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newToken = jwt.sign(
      {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        skillsOffered: updatedUser.skillsOffered || [],
        skillsWanted: updatedUser.skillsWanted || [],
        role: updatedUser.role,
        location: updatedUser.location,
        education: updatedUser.education,
        bio: updatedUser.bio
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ token: newToken });

  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
});

export default router;
