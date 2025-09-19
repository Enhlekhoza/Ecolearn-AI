import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { getEnv } from '../utils/env';

// Extend Express Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = bearer.split(' ')[1];
  const jwtSecret = getEnv('JWT_SECRET');

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: number };

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Store userId as string to match type
    req.user = { id: user.id.toString() };

    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ message: 'Token invalid' });
  }
};