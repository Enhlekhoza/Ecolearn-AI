import prisma from './src/lib/prisma';

async function main() {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: 1 },
    });

    if (quiz) {
      console.log('Quiz with ID 1 found:', quiz);
    } else {
      console.log('Quiz with ID 1 not found.');
    }
  } catch (error) {
    console.error('Error checking for quiz:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
