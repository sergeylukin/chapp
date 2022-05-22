import { Thunk, thunk, Action, action } from 'easy-peasy';

interface IUpdateDataPayload {
  name: string;
  course: string;
}

interface IUserModelState {
  name: string;
}

interface IUserModelActions {
  setName: Action<this, string>;
}

interface IUserModelThunks {
  updateDataThunk: Thunk<this, IUpdateDataPayload>;
}

export interface IUserModel
  extends IUserModelState,
    IUserModelActions,
    IUserModelThunks {}

export const userModel: IUserModel = {
  name: 'foo',
  // ACTIONS
  setName: action((state, payload) => {
    state.name = payload;
  }),
  // THUNKS
  updateDataThunk: thunk((actions, payload) => {
    actions.setName(payload.name);
  }),
};
