import User from "../model/User.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router();

router.get("/viewProfile/:id", async (req: any,authMiddleware:any, res: any) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-passwordHash");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user profile" });
    }
});

export default router;