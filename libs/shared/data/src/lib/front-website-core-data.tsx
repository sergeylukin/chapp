// import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Message as MessageModel,
  User as UserModel,
  Room as RoomModel,
} from '@prisma/client';

import {
  MessageWithUser,
  IMessage,
  IDraftMessage,
} from '@chapp/api-interfaces';
import { environment } from '@chapp/shared-config';

const API_URL = `${environment.API_BASEURL}api`;

export interface IDataService {
  joinRoom: (userId: number, roomId: number) => Promise<RoomModel>;
  leaveRoom: (userId: number, roomId: number) => Promise<RoomModel>;
  findUsernameOrCreate: (username: string) => Promise<UserModel>;
  sendMessage: (message: IMessage | IDraftMessage) => Promise<MessageModel>;
  updateMessage: (
    messageId: number,
    payload: {
      body: string | null;
      isVisuallyBroken: boolean;
    }
  ) => Promise<RoomModel>;
  fetchMessages: (roomId: number) => Promise<MessageWithUser[]>;
  fetchRooms: () => Promise<RoomModel[]>;
}

export const DataService: IDataService = {
  joinRoom: async (userId: number, roomId: number) => {
    return await axios
      .post(`${API_URL}/room/${roomId}/join`, {
        userId: userId,
      })
      .then((response) => response.data);
  },
  leaveRoom: async (userId: number, roomId: number) => {
    return await axios
      .post(`${API_URL}/room/${roomId}/leave`, {
        userId: userId,
      })
      .then((response) => response.data);
  },
  findUsernameOrCreate: async (name: string) =>
    await axios
      .post(`${API_URL}/signup`, {
        name,
      })
      .then((response) => response.data),
  sendMessage: async (message: IMessage | IDraftMessage) =>
    await axios
      .post(`${API_URL}/room/${message.roomId}/message`, message)
      .then((response) => response.data),
  fetchMessages: async (roomId) =>
    await axios
      .get(`${API_URL}/room/${roomId}/messages`)
      .then((response) => response.data),
  fetchRooms: async () =>
    await axios.get(`${API_URL}/rooms`).then((response) => response.data),
  updateMessage: async (messageId, payload) =>
    await axios
      .put(`${API_URL}/message/${messageId}`, payload)
      .then((response) => response.data),
};
