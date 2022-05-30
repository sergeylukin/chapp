import { PrismaClient } from '@prisma/client';
const seeds = require('./seed.json');
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

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

  // Fill in avatar for users created before avatars were introduced
  const users = await prisma.user.findMany();
  for (let user of users) {
    if (user.avatar) continue;
    const username = user.name;
    let avatar = createAvatar(style, {
      seed: username,
    });

    const avatarUpdate = await prisma.user.update({
      where: { id: user.id },
      data: { avatar },
    });
    console.log(`Created avatar for ${user.name}`, avatarUpdate);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
