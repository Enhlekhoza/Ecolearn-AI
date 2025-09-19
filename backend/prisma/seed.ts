
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
