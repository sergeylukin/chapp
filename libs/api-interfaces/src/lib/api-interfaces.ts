import { User as UserModel, Message as MessageModel } from '@prisma/client';

export interface BaseEntity {
  id: number | null;
}

export interface Message extends BaseEntity {
  body: string;
  roomId: number;
  userId: number;
}

export type IMessage = Omit<MessageModel, 'createdAt' | 'updatedAt' | 'id'>;

export interface User extends BaseEntity {
  username?: string;
}

export interface Room extends BaseEntity {
  name?: string;
}

export interface RoomWithMessages extends Room {
  messages: Message[];
}

export type IUser = Omit<UserModel, 'createdAt' | 'updatedAt' | 'id'>;

export interface MessageWithUser extends IMessage {
  user: IUser;
}

const API_HOST = process.env['API_HOST'];
const API_PORT = process.env['API_PORT'] ? `:${process.env['API_PORT']}` : '';
export const FEED_API_URL = `https://${API_HOST}${API_PORT}/api/`;
