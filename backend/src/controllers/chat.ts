import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { callAI } from '../services/ai';

export const getSessions = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const userId = Number(req.user.id);

  try {
    const sessions = await prisma.chatSession.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const userId = Number(req.user.id);
  const { message, sessionId } = req.body;

  try {
    const response = await callAI(message);

    let session;
    if (sessionId) {
      session = await prisma.chatSession.findUnique({
        where: { id: Number(sessionId) },
      });
    } else {
      session = await prisma.chatSession.create({
        data: {
          userId,
          title: message.substring(0, 20),
        },
      });
    }

    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    const chat = await prisma.chatHistory.create({
      data: {
        sessionId: session.id,
        message,
        response,
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  const { sessionId } = req.params;

  try {
    const history = await prisma.chatHistory.findMany({
      where: { sessionId: Number(sessionId) },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};