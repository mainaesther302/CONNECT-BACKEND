import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { Payload } from '../Models/auth'; // Adjust the import path as needed

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Extend the Request interface to include the `info` property
export interface ExtendedClientRequest extends Request {
    info?: Payload;
}

export const authorize = (roles: string[]) => {
    return (req: ExtendedClientRequest, res: Response, next: NextFunction) => {
        // const token = req.headers.authorization?.split(' ')[1];
        const token =req.headers['token'] as string;
        if (!token) {
            return res.status(403).json({ Message: 'Access Denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET as string) as Payload;
            if (!roles.includes(decoded.Role)) {
                return res.status(403).json({ Message: 'You do not have the necessary permissions' });
            }
            req.info = decoded; // Use the `info` property
            next();
        } catch (error) {
            return res.status(403).json({ Message: 'Invalid Token' });
        }
    };
};
