import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { getEnv } from '../utils/env';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  console.log('Auth Middleware: Bearer token received:', bearer);

  if (!bearer || !bearer.startsWith('Bearer ')) {
    console.log('Auth Middleware: No bearer token or invalid format.');
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = bearer.split(' ')[1];
  console.log('Auth Middleware: Extracted token:', token);
  const jwtSecret = getEnv('JWT_SECRET');

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: number };
    console.log('Auth Middleware: Decoded token:', decoded);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      console.log('Auth Middleware: User not found for decoded userId:', decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { id: user.id };
    console.log('Auth Middleware: User attached to request:', req.user);

    next();
  } catch (error) {
    console.error('Auth Middleware: JWT verification failed:', error);
    res.status(401).json({ message: 'Token invalid' });
  }
};