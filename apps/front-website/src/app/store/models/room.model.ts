import { Action, action } from 'easy-peasy';
import { Room as RoomModel, Message as MessageModel } from '@prisma/client';

interface IRoomModelState {
  room: RoomModel;
  messages: MessageModel[];
}

interface IRoomModelActions {
  setMessages: Action<this, MessageModel[]>;
  setRoom: Action<this, RoomModel>;
  resetRoom: Action<this>;
}

export interface IRoomModel extends IRoomModelState, IRoomModelActions {}

export const roomModel: IRoomModel = {
  room: {} as RoomModel,
  messages: [],
  // ACTIONS
  setMessages: action((state, payload) => {
    state.messages = payload;
  }),
  setRoom: action((state, payload) => {
    state.room = payload;
  }),
  resetRoom: action((state) => {
    state.room = {} as RoomModel;
  }),
};
