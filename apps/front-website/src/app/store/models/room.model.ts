import { Thunk, thunk, Action, action } from 'easy-peasy';
import { IMessage } from './message.model';
import { Room as RoomModel } from '@prisma/client';

interface IRoomModelState {
  room: RoomModel;
  messages: IMessage[];
}

interface IRoomModelActions {
  setMessages: Action<this, IMessage[]>;
  setRoom: Action<this, RoomModel>;
  resetRoom: Action<this>;
}

interface IRoomModelThunks {
  loadMessages: Thunk<this>;
}

export interface IRoomModel
  extends IRoomModelState,
    IRoomModelActions,
    IRoomModelThunks {}

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
  // THUNKS
  loadMessages: thunk((actions, payload) => {
    // actions.setCourse(payload.course);
    console.log('performing async operation to fetch msgs', payload);
    actions.setMessages([
      {
        body: 'asdad',
        userId: 1,
        roomId: 1,
      },
    ]);
  }),
};
