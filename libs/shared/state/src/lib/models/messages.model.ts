import { Thunk, thunk, Action, action } from 'easy-peasy';
import { Injections } from '../shared-state';
import { IStoreModel } from './';
import { MessageWithUser } from '@chapp/api-interfaces';

type IMessagesModelState = {
  messages: MessageWithUser[];
};

interface IMessagesModelActions {
  setMessages: Action<this, MessageWithUser[]>;
}

interface IMessagesModelThunks {
  loadMessagesThunk: Thunk<this, undefined, Injections, IStoreModel>;
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
  loadMessagesThunk: thunk(
    async (actions, payload, { injections, getStoreState }) => {
      const { DataService } = injections;
      const messages = await DataService.fetchMessages(
        getStoreState().roomModel.room.id
      );
      actions.setMessages(messages);
    }
  ),
};
