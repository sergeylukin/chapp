// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Thunk, thunk, Action, action } from 'easy-peasy';
import { Injections } from '../shared-state';
import { IStoreModel } from './';
import { MessageWithUser } from '@chapp/api-interfaces';

type bubble = {
  message: string;
  delay: number;
};
type IMessagesModelState = {
  messages: MessageWithUser[];
  bubbles: bubble[];
};

interface IMessagesModelActions {
  setMessages: Action<this, MessageWithUser[]>;
  toggleBubbles: Action<this>;
}

interface IMessagesModelThunks {
  loadMessagesThunk: Thunk<this, undefined, Injections, IStoreModel>;
}

export interface IMessagesModel
  extends IMessagesModelState,
    IMessagesModelActions,
    IMessagesModelThunks {}

export const messagesModel: IMessagesModel = {
  bubbles: [],
  messages: [],
  // ACTIONS
  setMessages: action((state, payload) => {
    state.messages = payload;
    state.bubbles = payload.map((item) => ({
      message: '',
      delay: 0,
    }));
  }),
  toggleBubbles: action((state, payload) => {
    const randomSelection = (originalArray, n) => {
      const newArr = {};
      if (n >= originalArray.length) {
        return originalArray;
      }
      for (let i = 0; i < n; i++) {
        let newIndex = Math.floor(Math.random() * originalArray.length);
        let newElem = originalArray[newIndex];
        while (newArr[newIndex]) {
          newIndex = Math.floor(Math.random() * originalArray.length);
          newElem = originalArray[newIndex];
        }
        newArr[newIndex] = true;
      }
      return newArr;
    };
    const selectedForToggle = randomSelection(
      state.bubbles,
      state.bubbles.length - state.bubbles.length * 0.6
    );
    const sentences = [
      'pls fix me!',
      'I would do that right!',
      'oh noes....',
      'noooob!',
      'does he even know box-model or what?',
      'I want to be properly aligned!',
      'what happened??',
      'Save us!',
      'He has no clue in styling...',
      'Avatar is the most important element on the web!',
      'pleease...',
      'does he know what CSS stands for?',
      'help!',
    ];
    const delays = [0.1, 0.6, 1.5];
    const newBubbles = state.bubbles.map((bubble, index) => {
      if (selectedForToggle[index]) {
        if (!state.messages[index].isVisuallyBroken) return bubble;
        return {
          message: bubble.message
            ? ''
            : sentences[Math.floor(Math.random() * sentences.length)],
          delay: delays[Math.floor(Math.random() * delays.length)],
        };
      } else {
        return bubble;
      }
    });
    state.bubbles = [...newBubbles];
  }),
  // THUNKS
  loadMessagesThunk: thunk(
    async (actions, payload, { injections, getStoreState }) => {
      const { DataService } = injections;
      const messages = await DataService.fetchMessages(
        getStoreState().roomModel.room.id
      );
      actions.setMessages(messages);
      actions.toggleBubbles();
    }
  ),
};
