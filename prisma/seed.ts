import { PrismaClient } from '@prisma/client';
const seeds = require('./seed.json');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?schema=public`,
    },
  },
});

async function main() {
  console.log('Seeding...');
  /// --------- Users ---------------
  for (let user of seeds.users) {
    const userExists = await prisma.user.count({
      where: {
        name: user.name,
      },
    });
    if (!userExists) {
      console.log(`inserting user with name ${user.name}`);
      await prisma.user.create({ data: user });
    }
  }
  /// --------- Rooms ---------------
  for (let room of seeds.rooms) {
    const roomExists = await prisma.room.count({
      where: {
        name: room.name,
      },
    });
    if (!roomExists) {
      console.log(`inserting room with name ${room.name}`);
      await prisma.room.create({ data: room });
    }
  }

  /// ---- Messages ------
  const messagesCount = await prisma.message.count();
  if (messagesCount === 0) {
    for (let message of seeds.messages) {
      message.createdAt = new Date(message.createdAt);
      console.log(message.createdAt);
      console.log(`inserting message with body ${message.body}`);
      await prisma.message.create({ data: message });
    }
  }

  /// set messages sent before 2022-05-28 as "visually broken"
  const messages = await prisma.message.updateMany({
    where: {
      isVisuallyBroken: null,
      createdAt: {
        lt: new Date('2022-05-28'),
      },
    },
    data: {
      isVisuallyBroken: true,
    },
  });
  console.log('Update messages', messages);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
