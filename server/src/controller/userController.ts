import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_pass } from ".."; // Ensure this is correctly imported

// Extend the Request interface
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "Token is not set!" });
    }

    const actToken = token.split(" ")[1];
    if (!actToken) {
        return res.status(401).json({ msg: "Invalid token format!" });
    }

    jwt.verify(actToken, jwt_pass as string, (err, user: any) => {
        if (err) {
            return res.status(403).json({ msg: "Invalid or expired token!" });
        }

        if (user && user.userId) {
            req.userId = user.userId; // Attach userId to req
            next();
        } else {
            return res.status(400).json({ msg: "User data is missing in token!" });
        }
    });
};
