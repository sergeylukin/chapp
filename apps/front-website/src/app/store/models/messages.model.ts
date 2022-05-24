import { Thunk, thunk, Action, action } from 'easy-peasy';
import { Message as MessageModel } from '@prisma/client';

type IMessagesModelState = {
  messages: MessageModel[];
};

interface IMessagesModelActions {
  setMessages: Action<this, MessageModel[]>;
}

interface IMessagesModelThunks {
  loadMessagesThunk: Thunk<this>;
}

export interface IMessagesModel
  extends IMessagesModelState,
    IMessagesModelActions,
    IMessagesModelThunks {}

export const messagesModel: IMessagesModel = {
  messages: [],
  // ACTIONS
  setMessages: action((state, payload) => {
    state.messages = payload;
  }),
  // THUNKS
  loadMessagesThunk: thunk((actions, payload) => {
    // actions.setCourse(payload.course);
    console.log('performing async operation to fetch msgs', payload);
    console.log(actions);
    // actions.setMessages();
  }),
};
