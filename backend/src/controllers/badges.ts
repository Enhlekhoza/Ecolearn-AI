import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getBadges = async (req: Request, res: Response) => {
  try {
    const badges = await prisma.badge.findMany();
    res.json(badges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

export const getUserBadges = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userBadges = await prisma.userBadge.findMany({
      where: { userId: parseInt(id) },
      include: { badge: true },
    });
    res.json(userBadges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user badges' });
  }
};
