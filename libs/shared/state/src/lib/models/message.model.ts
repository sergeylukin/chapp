import { Thunk, thunk, Action, action } from 'easy-peasy';
import { Injections } from '@chapp/shared-state';
import { IStoreModel } from './';
import { User as UserModel, Room as RoomModel } from '@prisma/client';
import { IMessage } from '@chapp/api-interfaces';

interface IMessageModelState {
  message: IMessage;
}
interface IMessageModelActions {
  setMessageBody: Action<this, string>;
  setMessageRoom: Action<this, RoomModel>;
  setMessageUser: Action<this, UserModel>;
  setMessage: Action<this, IMessage>;
}

interface IMessageModelThunks {
  sendMessageThunk: Thunk<this, string, Injections, IStoreModel>;
}

export interface IMessageModel
  extends IMessageModelState,
    IMessageModelActions,
    IMessageModelThunks {}

export const messageModel: IMessageModel = {
  message: {} as IMessage,
  // ACTIONS
  setMessageBody: action((state, body) => {
    state.message.body = body;
  }),
  setMessageRoom: action((state, room) => {
    state.message.roomId = room.id;
  }),
  setMessageUser: action((state, user) => {
    state.message.userId = user.id;
  }),
  setMessage: action((state, message) => {
    state.message = message;
  }),
  // THUNKS
  sendMessageThunk: thunk(
    async (actions, msg, { injections, getStoreState, getStoreActions }) => {
      const { DataService } = injections;
      const user = getStoreState().userModel.user;
      const room = getStoreState().roomModel.room;
      const message = {
        body: msg as string,
        userId: user.id,
        roomId: room.id,
      };
      actions.setMessage(message);
      try {
        const response = await DataService.sendMessage(message);
        // getStoreActions().messagesModel.addMessage(message);
        getStoreActions().messagesModel.setMessages([
          ...getStoreState().messagesModel.messages,
          message,
        ]);
      } catch (e) {
        // failed, retry?
      }
    }
  ),
};
