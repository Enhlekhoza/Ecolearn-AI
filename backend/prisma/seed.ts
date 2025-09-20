import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

const prisma = new PrismaClient();

async function seedQuizzes() {
  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'Climate Change Basics',
      description: 'Test your knowledge of the basics of climate change.',
      questions: {
        create: [
          {
            text: 'What is the main cause of climate change?',
            answers: {
              create: [
                { text: 'Volcanic eruptions', isCorrect: false },
                { text: 'Human activities', isCorrect: true },
                { text: 'Changes in the Earth\'s orbit', isCorrect: false },
                { text: 'Solar flares', isCorrect: false },
              ],
            },
          },
          {
            text: 'Which of the following is a greenhouse gas?',
            answers: {
              create: [
                { text: 'Oxygen', isCorrect: false },
                { text: 'Nitrogen', isCorrect: false },
                { text: 'Carbon dioxide', isCorrect: true },
                { text: 'Argon', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });
  console.log(`Created quiz with id: ${quiz1.id}`);

  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'Renewable Energy',
      description: 'How much do you know about renewable energy sources?',
      questions: {
        create: [
          {
            text: 'Which of these is a renewable energy source?',
            answers: {
              create: [
                { text: 'Coal', isCorrect: false },
                { text: 'Natural Gas', isCorrect: false },
                { text: 'Solar Power', isCorrect: true },
                { text: 'Petroleum', isCorrect: false },
              ],
            },
          },
          {
            text: 'What is the main benefit of renewable energy?',
            answers: {
              create: [
                { text: 'It is cheaper to produce', isCorrect: false },
                { text: 'It produces less greenhouse gas emissions', isCorrect: true },
                { text: 'It is easier to transport', isCorrect: false },
                { text: 'It is available everywhere', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });
  console.log(`Created quiz with id: ${quiz2.id}`);

  const quiz3 = await prisma.quiz.create({
    data: {
      title: 'Waste Management',
      description: 'Test your knowledge on reducing waste and recycling.',
      questions: {
        create: [
          {
            text: 'Which of the following is part of the "3 Rs" of waste management?',
            answers: {
              create: [
                { text: 'Recreate', isCorrect: false },
                { text: 'Reduce', isCorrect: true },
                { text: 'Rebuild', isCorrect: false },
                { text: 'Replant', isCorrect: false },
              ],
            },
          },
          {
            text: 'What is composting?',
            answers: {
              create: [
                { text: 'Burning organic waste', isCorrect: false },
                { text: 'Burying plastic waste', isCorrect: false },
                { text: 'Recycling glass bottles', isCorrect: false },
                { text: 'Decomposing organic matter to create fertilizer', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });
  console.log(`Created quiz with id: ${quiz3.id}`);
}

async function main() {
  // Create a default user with ID 1 for chat sessions
  const defaultUserEmail = 'user@example.com';
  const defaultUserName = 'Default User';
  const defaultUserPassword = 'password123'; // Choose a strong default password

  // Hash the password
  const hashedPassword = await bcrypt.hash(defaultUserPassword, 10);

  // Check if user with ID 1 already exists to prevent errors on re-seeding
  let user1 = await prisma.user.findUnique({
    where: { id: 1 },
  });

  if (!user1) {
    user1 = await prisma.user.create({
      data: {
        id: 1, // Explicitly set ID to 1
        email: defaultUserEmail,
        name: defaultUserName,
        password: hashedPassword,
      },
    });
    console.log(`Created default user with ID: ${user1.id}`);
  } else {
    console.log(`Default user with ID 1 already exists.`);
  }

  // Clear existing data
  await prisma.userEcoTip.deleteMany({});
  await prisma.userBadge.deleteMany({});
  await prisma.userQuiz.deleteMany({});
  await prisma.answer.deleteMany({}); // New
  await prisma.question.deleteMany({}); // New
  await prisma.ecoTip.deleteMany({});
  await prisma.badge.deleteMany({});
  await prisma.quiz.deleteMany({});


  const tips = [
    {
      tip: 'Use reusable bags when shopping.',
      category: 'Shopping',
    },
    {
      tip: 'Turn off lights when you leave a room.',
      category: 'Energy',
    },
    {
      tip: 'Fix leaky faucets.',
      category: 'Water',
    },
    {
      tip: 'Walk or bike for short trips.',
      category: 'Transport',
    },
    {
      tip: 'Compost your food scraps.',
      category: 'Waste',
    },
  ];

  for (const tip of tips) {
    await prisma.ecoTip.create({
      data: tip,
    });
  }
  console.log('Seeded EcoTips.');

  const badges = [
    {
      name: 'First Steps',
      description: 'You took your first step to a greener life!',
      icon: 'footprints',
      points: 10,
    },
    {
      name: 'Quiz Whiz',
      description: 'You passed your first quiz!',
      icon: 'brain',
      points: 20,
    },
    {
      name: 'Eco-Warrior',
      description: 'You have completed 5 eco-tips!',
      icon: 'shield',
      points: 50,
    },
  ];

  for (const badge of badges) {
    await prisma.badge.create({
      data: badge,
    });
  }
  console.log('Seeded Badges.');

  await seedQuizzes();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });