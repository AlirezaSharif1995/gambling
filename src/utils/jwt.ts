import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = 'AlirezaSharif'; // Consider using environment variables for sensitive data

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1]; 

      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        next(); 
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error('JWT authentication error:', error);
    res.sendStatus(500); 
  }
};
