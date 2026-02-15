import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface AuthRequest extends Request {
    userId?: string
}

interface MyJwtPayload extends JwtPayload {
    userId: string
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" })
    }

    const parts = authHeader.split(" ")

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid authorization format" })
    }

    const token = parts[1]

    try {
        const secret = process.env.JWT_SECRET

        if (!secret) {
            return res.status(500).json({ message: "Server configuration error" })
        }

        const decoded = jwt.verify(token, secret) as MyJwtPayload

        if (!decoded.id) {
            return res.status(401).json({ message: "Invalid token payload" })
        }

        req.userId = decoded.id
        next()
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

export default authMiddleware
