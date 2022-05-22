// import { useState, useEffect } from 'react';
import axios from 'axios';
import { User as UserModel, Room as RoomModel } from '@prisma/client';

import { FEED_API_URL } from '@justt/api-interfaces';

export interface IUserService {
  joinRoom: (userId: number, roomId: number) => Promise<RoomModel>;
  findUsernameOrCreate: (username: string) => Promise<UserModel>;
}

interface User {
  id: number;
  name: string;
}

export const UserService: IUserService = {
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
};

// export function useFeed(searchString: string) {
//   const [feed, setFeed] = useState<MessageWithUser[]>([]);
//   useEffect(() => {
//     findBy(searchString).then((value) => {
//       setFeed(value.data);
//     });
//   }, [searchString]);
//   return feed;
// }

export const api = {
  UserService,
};

export default api;
