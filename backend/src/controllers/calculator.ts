import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const calculate = async (req: Request, res: Response) => {
  const user = (req as any).user; // ✅ cast once

  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const userId = Number(user.id); // Convert to number
  const { transport, energy, diet } = req.body;
  const total = transport + energy + diet;

  try {
    const carbonFootprint = await prisma.carbonFootprint.upsert({
      where: { userId },
      update: { transport, energy, diet, total },
      create: { userId, transport, energy, diet, total },
    });

    res.status(200).json(carbonFootprint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getFootprint = async (req: Request, res: Response) => {
  const user = (req as any).user; // ✅ cast once

  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const userId = Number(user.id);

  try {
    const carbonFootprint = await prisma.carbonFootprint.findUnique({
      where: { userId },
    });

    if (!carbonFootprint) {
      return res.status(404).json({ error: 'Carbon footprint not found' });
    }

    res.status(200).json(carbonFootprint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};