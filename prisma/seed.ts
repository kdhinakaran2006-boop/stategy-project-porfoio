import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const projects = [
    { name: 'Project Atlas', budget: 150000, roi: 25.5, risk: 15.0, teamSize: 8, duration: 12, status: 'Active' },
    { name: 'Project Titan', budget: 300000, roi: 18.2, risk: 45.0, teamSize: 15, duration: 24, status: 'Active' },
    { name: 'Project Horizon', budget: 85000, roi: 32.1, risk: 20.0, teamSize: 4, duration: 6, status: 'Completed' },
    { name: 'Project Zenith', budget: 500000, roi: 12.5, risk: 65.0, teamSize: 22, duration: 36, status: 'On Hold' },
    { name: 'Project Apollo', budget: 120000, roi: 22.8, risk: 10.0, teamSize: 6, duration: 10, status: 'Active' },
    { name: 'Project Spark', budget: 45000, roi: 45.0, risk: 35.0, teamSize: 2, duration: 3, status: 'Active' },
    { name: 'Project Vector', budget: 220000, roi: 15.6, risk: 30.0, teamSize: 10, duration: 18, status: 'Active' },
    { name: 'Project Nova', budget: 95000, roi: 28.4, risk: 12.0, teamSize: 5, duration: 8, status: 'Active' },
    { name: 'Project Pulsar', budget: 175000, roi: 20.1, risk: 25.0, teamSize: 7, duration: 14, status: 'On Hold' },
    { name: 'Project Quasar', budget: 400000, roi: 10.5, risk: 55.0, teamSize: 18, duration: 28, status: 'Active' },
    { name: 'Project Orbit', budget: 60000, roi: 38.2, risk: 18.0, teamSize: 3, duration: 5, status: 'Completed' },
    { name: 'Project Nebula', budget: 280000, roi: 19.5, risk: 40.0, teamSize: 12, duration: 20, status: 'Active' },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
