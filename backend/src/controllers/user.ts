import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Helper to safely get user from req
const getUserFromReq = (req: Request) => (req as any).user;

export const getProfile = async (req: Request, res: Response) => {
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ message: 'Not authorized' });

  const dbUser = await prisma.user.findUnique({ where: { id: Number(user.id) } });
  if (!dbUser) return res.status(404).json({ message: 'User not found' });

  res.json({ id: dbUser.id, email: dbUser.email, name: dbUser.name });
};