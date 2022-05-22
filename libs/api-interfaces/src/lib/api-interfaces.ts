export interface BaseEntity {
  id: number | null;
}

export interface Message extends BaseEntity {
  body: string;
  roomId: number;
  userId: number;
}
export interface MessageWithUser extends Message {
  user: User;
}

export interface User extends BaseEntity {
  username?: string;
}

export interface Room extends BaseEntity {
  name?: string;
}

export interface RoomWithMessages extends Room {
  messages: Message[];
}

export const FEED_API_URL = '/api/';
