import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Function to award badges
const awardBadge = async (userId: number, badgeName: string) => {
  const badge = await prisma.badge.findUnique({ where: { name: badgeName } });
  if (badge) {
    const existingBadge = await prisma.userBadge.findFirst({
      where: {
        userId,
        badgeId: badge.id,
      },
    });
    if (!existingBadge) {
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id,
        },
      });
    }
  }
};

export const getTips = async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    let tips;
    if (category && typeof category === 'string') {
      tips = await prisma.ecoTip.findMany({
        where: { category },
      });
    } else {
      tips = await prisma.ecoTip.findMany();
    }
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getTip = async (req: Request, res: Response) => {
  try {
    const tips = await prisma.ecoTip.findMany();
    const randomIndex = Math.floor(Math.random() * tips.length);
    const randomTip = tips[randomIndex];

    res.status(200).json(randomTip);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const saveTip = async (req: Request, res: Response) => {
  const { tip, category } = req.body;

  try {
    const newTip = await prisma.ecoTip.create({
      data: {
        tip,
        category,
      },
    });

    res.status(201).json(newTip);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const completeTip = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id; // Added non-null assertion operator

  try {
    // Create a UserEcoTip record
    await prisma.userEcoTip.create({
      data: {
        userId,
        ecoTipId: parseInt(id),
      },
    });

    // Award points
    const user = await prisma.user.update({
      where: { id: userId },
      data: { points: { increment: 10 } },
    });

    // Check for badges
    const completedTipsCount = await prisma.userEcoTip.count({
      where: { userId },
    });

    if (completedTipsCount === 1) {
      await awardBadge(userId, 'First Steps');
    }

    if (completedTipsCount === 5) {
      await awardBadge(userId, 'Eco-Warrior');
    }

    res.status(200).json({ message: 'Tip completed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
