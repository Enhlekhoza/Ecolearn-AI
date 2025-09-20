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
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: {
          include: {
            answers: {
              select: {
                id: true,
                text: true,
              },
            },
          },
        },
      },
    });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id; // Added non-null assertion operator
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

    // Save the user's quiz attempt
    await prisma.userQuiz.create({
      data: {
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
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};