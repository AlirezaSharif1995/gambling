"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'AlirezaSharif'; // Use an environment variable
// Generate a JWT token for a given user ID
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, SECRET_KEY, { expiresIn: '6h' });
};
exports.generateToken = generateToken;
// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Forbidden. Invalid token.' });
        }
        // Attach user data to the request object
        if (decoded) {
            req.user = decoded;
        }
        if (req.body.playerToken != decoded.userId) {
            return res.status(401).json({ message: 'Access denied. playerToken doesnt match.' });
        }
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
