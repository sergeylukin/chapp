// import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Message as MessageModel,
  User as UserModel,
  Room as RoomModel,
} from '@prisma/client';

import { IMessage, FEED_API_URL } from '@chapp/api-interfaces';

export interface IDataService {
  joinRoom: (userId: number, roomId: number) => Promise<RoomModel>;
  leaveRoom: (userId: number, roomId: number) => Promise<RoomModel>;
  findUsernameOrCreate: (username: string) => Promise<UserModel>;
  sendMessage: (message: IMessage) => Promise<MessageModel>;
  fetchMessages: (roomId: number) => Promise<MessageModel[]>;
}

interface User {
  id: number;
  name: string;
}

export const DataService: IDataService = {
  joinRoom: async (userId: number, roomId: number) => {
    console.log(userId, roomId);
    return await axios
      .post(
        `${FEED_API_URL}room/${roomId}/join`,
        {
          userId: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response.data);
  },
  leaveRoom: async (userId: number, roomId: number) => {
    console.log(userId, roomId);
    return await axios
      .post(
        `${FEED_API_URL}room/${roomId}/leave`,
        {
          userId: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response.data);
  },
  findUsernameOrCreate: async (name: string) =>
    await axios
      .post(
        `${FEED_API_URL}signup`,
        {
          name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response.data),
  sendMessage: async (message: IMessage) =>
    await axios
      .post(`${FEED_API_URL}room/${message.roomId}/message`, message)
      .then((response) => response.data),
  fetchMessages: async (roomId) =>
    await axios
      .get(`${FEED_API_URL}room/${roomId}/messages`)
      .then((response) => response.data),
};
