import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import JWT_PASS from "./config";

// Extend Request interface to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function middleWare(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        // If using "Bearer <token>" format
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const decoded = jwt.verify(token, JWT_PASS) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.username) {
            return res.status(403).json({ error: "Invalid token" });
        }

        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token verification failed" });
    }
}
