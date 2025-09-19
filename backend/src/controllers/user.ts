import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getProfile = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });

  const user = await prisma.user.findUnique({ where: { id: Number(req.user.id) } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ id: user.id, email: user.email, name: user.name });
};