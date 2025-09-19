import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getTips = async (req: Request, res: Response) => {
  try {
    const tips = await prisma.ecoTip.findMany();
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