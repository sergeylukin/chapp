import { IMessage } from './message.model';

export type IMessagesModel = {
  messages: IMessage[];
};

export const messagesModel: IMessagesModel = {
  messages: [
    {
      body: 'asdads',
      roomId: 1,
      userId: 1,
    },
  ],
};
