import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        points: 'desc',
      },
      take: 10,
      select: {
        id: true,
        name: true,
        points: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
