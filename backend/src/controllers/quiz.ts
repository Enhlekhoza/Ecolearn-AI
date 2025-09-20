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

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('Received quiz ID from params:', id);
    const parsedId = parseInt(id);
    console.log('Parsed quiz ID:', parsedId);

    const quiz = await prisma.quiz.findUnique({
      where: { id: parsedId },
      include: {
        questions: {
          include: {
            answers: {
              select: {
                id: true,
                text: true,
                isCorrect: true,
              },
            },
          },
        },
      },
    });
    console.log('Quiz found by Prisma:', quiz);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error('Failed to fetch quiz', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Provide a fallback userId if req.user is not defined (e.g., for unauthenticated users)
  const userId = req.user?.id || 1; // Use default user ID 1 if not authenticated
  const { answers } = req.body; // answers: { [questionId]: answerId }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    let score = 0;
    for (const question of quiz.questions) {
      const correctAnswer = question.answers.find((a) => a.isCorrect);
      if (correctAnswer && correctAnswer.id === answers[question.id]) {
        score++;
      }
    }

    const percentage = (score / quiz.questions.length) * 100;

    // Save or update the user's quiz attempt
    await prisma.userQuiz.upsert({
      where: {
        userId_quizId: {
          userId,
          quizId: parseInt(id),
        },
      },
      update: {
        score: percentage,
      },
      create: {
        userId,
        quizId: parseInt(id),
        score: percentage,
      },
    });

    // Award points
    await prisma.user.update({
      where: { id: userId },
      data: { points: { increment: Math.round(percentage / 10) } },
    });

    // Award badge if score is high
    if (percentage >= 80) {
      await awardBadge(userId, 'Quiz Whiz');
    }

    res.status(200).json({ score: percentage });
  } catch (error: any) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
};
