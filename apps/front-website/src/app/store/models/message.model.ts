import { Thunk, thunk, Action, action } from 'easy-peasy';
import { Injections } from '../';
import { IStoreModel } from './';
import {
  User as UserModel,
  Room as RoomModel,
  Message as MessageModel,
} from '@prisma/client';

export type IMessageBody = string | undefined;

interface IMessageModelState {
  message: MessageModel;
}
interface IMessageModelActions {
  setMessageBody: Action<this, string>;
  setMessageRoom: Action<this, RoomModel>;
  setMessageUser: Action<this, UserModel>;
}

interface IMessageModelThunks {
  sendMessageThunk: Thunk<
    this,
    null | string | number | readonly string[] | undefined,
    Injections,
    IStoreModel
  >;
}

export interface IMessageModel
  extends IMessageModelState,
    IMessageModelActions,
    IMessageModelThunks {}

export const messageModel: IMessageModel = {
  message: {} as MessageModel,
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
  // THUNKS
  sendMessageThunk: thunk((actions, payload, { injections, getState }) => {
    // actions.setCourse(payload.course);
    console.log(payload);
    console.log(actions);
    console.log(injections);

    console.log(
      'performing async operation to send msg:',
      getState().message.body
    );
    // actions.setMessages([
    //   {
    //     body: 'asdad',
    //     userId: 1,
    //     roomId: 1,
    //   },
    // ]);
  }),
};
