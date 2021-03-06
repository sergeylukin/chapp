import {
  Controller,
  Put,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { MessageWithUser } from '@chapp/api-interfaces';
import {
  User as UserModel,
  Room as RoomModel,
  Message as MessageModel,
} from '@prisma/client';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly dataService: PrismaService) {}

  @Get('message/:id')
  async getMessageById(@Param('id') id: string): Promise<MessageModel> {
    return this.dataService.message.findUnique({
      where: { id: Number(id) },
    });
  }

  @Delete('message/:id')
  async deleteMessage(@Param('id') id: string): Promise<MessageModel> {
    return this.dataService.message.delete({ where: { id: Number(id) } });
  }

  @Get('feed')
  async getFilteredMessages(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc'
  ): Promise<MessageWithUser[]> {
    const or = searchString
      ? {
          OR: [
            {
              body: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
            {
              user: {
                name: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            },
          ],
        }
      : {};

    // eslint-disable-next-line
    // @ts-ignore
    return this.dataService.message.findMany({
      include: { user: true },
      // eslint-disable-next-line
      // @ts-ignore
      where: or,
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        createdAt: orderBy,
      },
    });
  }

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.dataService.user.findMany();
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.dataService.user.findFirst({
      where: { id: parseInt(id, 10) },
    });
  }

  @Get('rooms')
  async getAllRooms(): Promise<RoomModel[]> {
    return this.dataService.room.findMany();
  }

  @Get('room/:id/messages')
  async getMessagesByRoom(@Param('id') id: string): Promise<MessageWithUser[]> {
    return this.dataService.room
      .findUnique({
        where: { id: Number(id) },
      })
      .messages({
        include: {
          user: true,
        },
        orderBy: {
          id: 'asc',
        },
      });
  }

  @Get('user/:id/messages')
  async getMessagesByUser(@Param('id') id: string): Promise<MessageModel[]> {
    return this.dataService.user
      .findUnique({
        where: { id: Number(id) },
      })
      .messages();
  }

  @Post('room/:id/message')
  async createDraft(
    @Param('id') roomId: number,
    @Body()
    messageData: {
      body: string;
      userId: number;
    }
  ): Promise<MessageModel> {
    const { body, userId } = messageData;
    if (body === '/reset') {
      await this.dataService.resetFixedMessages();
    }
    return this.dataService.message.create({
      data: {
        body,
        room: {
          connect: { id: Number(roomId) },
        },
        user: {
          connect: { id: Number(userId) },
        },
      },
    });
  }

  @Post('room/:id/join')
  async joinRoom(
    @Param('id') roomId: number,
    @Body()
    messageData: {
      userId: string;
    }
  ): Promise<RoomModel> {
    const { userId } = messageData;
    await this.dataService.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        rooms: {
          connect: {
            id: Number(roomId),
          },
        },
      },
    });
    return this.dataService.room.findUnique({
      where: { id: Number(roomId) },
    });
  }

  @Post('room/:id/leave')
  async leaveRoom(
    @Param('id') roomId: number,
    @Body()
    messageData: {
      userId: string;
    }
  ): Promise<UserModel> {
    const { userId } = messageData;
    return await this.dataService.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        rooms: {
          disconnect: {
            id: Number(roomId),
          },
        },
      },
    });
  }

  @Put('message/:id')
  async updateMessage(
    @Param('id') id: number,
    @Body()
    messageData: {
      body: string;
      isVisuallyBroken: boolean;
    }
  ): Promise<MessageModel> {
    return this.dataService.message.update({
      where: {
        id: Number(id),
      },
      data: messageData,
    });
  }

  @Post('signup')
  async signupUser(
    @Body()
    userData: {
      name?: string;
    }
  ): Promise<UserModel> {
    const user = await this.dataService.user.findFirst({
      where: {
        name: userData.name,
      },
    });
    if (!user) {
      const avatar = createAvatar(style, { seed: userData.name });
      return await this.dataService.user.create({
        data: {
          name: userData.name,
          avatar,
        },
      });
    }
    return user;
  }
}
