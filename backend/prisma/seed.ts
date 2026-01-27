import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRooms() {
  const rooms = [];

  // Floors 1–9
  for (let floor = 1; floor <= 9; floor++) {
    for (let pos = 1; pos <= 10; pos++) {
      rooms.push({
        roomNumber: floor * 100 + pos,
        floor,
        position: pos,
        isAvailable: true,
      });
    }
  }

  // Floor 10 (7 rooms)
  for (let pos = 1; pos <= 7; pos++) {
    rooms.push({
      roomNumber: 1000 + pos,
      floor: 10,
      position: pos,
      isAvailable: true,
    });
  }

  await prisma.room.createMany({
    data: rooms,
    skipDuplicates: true,
  });

  console.log('✅ Rooms seeded successfully');
}

seedRooms()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
