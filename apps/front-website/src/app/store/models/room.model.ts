import { Thunk, thunk, Action, action } from 'easy-peasy';
import { IMessage } from './message.model';

export type IRoom = {
  id: number;
  name: string;
  messages: IMessage[];
};

type IRoomModelState = IRoom;

interface IRoomModelActions {
  setMessages: Action<this, IMessage[]>;
}

interface IRoomModelThunks {
  loadMessages: Thunk<this>;
}

export interface IRoomModel
  extends IRoomModelState,
    IRoomModelActions,
    IRoomModelThunks {}

export const roomModel: IRoomModel = {
  id: 0,
  name: 'foo',
  messages: [],
  // ACTIONS
  setMessages: action((state, payload) => {
    state.messages = payload;
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
