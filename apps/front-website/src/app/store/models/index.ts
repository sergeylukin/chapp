import { userModel, IUserModel } from './user.model';
import { messagesModel, IMessagesModel } from './messages.model';
import { messageModel, IMessageModel } from './message.model';
import { roomModel, IRoomModel } from './room.model';
import { roomsModel, IRoomsModel } from './rooms.model';

export interface IStoreModel {
  userModel: IUserModel;
  roomModel: IRoomModel;
  messagesModel: IMessagesModel;
  messageModel: IMessageModel;
  roomsModel: IRoomsModel;
}

const model: IStoreModel = {
  userModel,
  messagesModel,
  messageModel,
  roomModel,
  roomsModel,
};

export default model;
