import { Thunk, thunk, Action, action } from 'easy-peasy';
import { Injections } from '../';
import { IStoreModel } from './';
import { IMessage } from '@chapp/api-interfaces';

type IMessagesModelState = {
  messages: IMessage[];
};

interface IMessagesModelActions {
  setMessages: Action<this, IMessage[]>;
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
