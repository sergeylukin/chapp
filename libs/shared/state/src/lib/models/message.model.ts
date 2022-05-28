import { Thunk, thunk, Action, action } from 'easy-peasy';
import { Injections } from '../shared-state';
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
  fixMessagePositioning: Thunk<this, IMessage, Injections, IStoreModel>;
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
        id: null,
        body: msg as string,
        userId: user.id,
        roomId: room.id,
        isVisuallyBroken: false,
      };
      try {
        const response = await DataService.sendMessage(message);
        if (msg === '/reset')
          getStoreActions().messagesModel.loadMessagesThunk();
        const newMessage = response;
        actions.setMessage(newMessage);
        getStoreActions().messagesModel.setMessages([
          ...getStoreState().messagesModel.messages,
          {
            ...newMessage,
            user,
          },
        ]);
      } catch (e) {
        // failed, retry?
      }
    }
  ),
  fixMessagePositioning: thunk(
    async (actions, msg, { injections, getStoreState, getStoreActions }) => {
      const { DataService } = injections;
      try {
        const response = await DataService.updateMessage(msg.id, {
          body: msg.body,
          isVisuallyBroken: false,
        });
        console.log('YAAY', response);
        getStoreActions().messagesModel.setMessages(
          getStoreState().messagesModel.messages.map((message) =>
            message.id === msg.id ? { ...message, ...response } : message
          )
        );
      } catch (e) {
        // failed, retry?
      }
    }
  ),
};
