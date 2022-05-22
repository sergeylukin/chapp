export type IMessage = {
  body: string;
  roomId: number;
  userId: number;
};

export type IMessageModel = IMessage;

export const messageModel: IMessageModel = {
  body: '',
  roomId: 0,
  userId: 0,
};
