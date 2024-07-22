"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const authorize = (roles) => {
    return (req, res, next) => {
        // const token = req.headers.authorization?.split(' ')[1];
        const token = req.headers['token'];
        if (!token) {
            return res.status(403).json({ Message: 'Access Denied' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            if (!roles.includes(decoded.Role)) {
                return res.status(403).json({ Message: 'You do not have the necessary permissions' });
            }
            req.info = decoded; // Use the `info` property
            next();
        }
        catch (error) {
            return res.status(403).json({ Message: 'Invalid Token' });
        }
    };
};
exports.authorize = authorize;
