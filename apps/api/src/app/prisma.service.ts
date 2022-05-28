import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async resetFixedMessages() {
    await this.message.updateMany({
      where: {
        createdAt: {
          lt: new Date('2022-05-28'),
        },
      },
      data: {
        isVisuallyBroken: true,
      },
    });
  }
}
