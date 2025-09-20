
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

const prisma = new PrismaClient();

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
