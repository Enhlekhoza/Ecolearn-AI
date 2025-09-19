
import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const calculate = async (req: Request, res: Response) => {
  const { transport, energy, diet } = req.body;
  const userId = req.user.id;

  const total = transport + energy + diet;

  try {
    const carbonFootprint = await prisma.carbonFootprint.upsert({
      where: { userId },
      update: { transport, energy, diet, total },
      create: { userId, transport, energy, diet, total },
    });

    res.status(200).json(carbonFootprint);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getFootprint = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const carbonFootprint = await prisma.carbonFootprint.findUnique({
      where: { userId },
    });

    if (!carbonFootprint) {
      return res.status(404).json({ error: 'Carbon footprint not found' });
    }

    res.status(200).json(carbonFootprint);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
