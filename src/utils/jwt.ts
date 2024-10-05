import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.JWT_SECRET || 'AlirezaSharif'; // Use an environment variable

// Generate a JWT token for a given user ID
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '6h' });
};

// Middleware to authenticate JWT
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: JwtPayload | any) => {
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

// Optionally, you can define a type for the user object
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // or create a specific interface for your user data
    }
  }
}
