import { Thunk, thunk, Action, action } from 'easy-peasy';

interface IUpdateDataPayload {
  name: string;
  course: string;
}

export interface IStoreModelState {
  name: string;
  course: string;
}

export interface IStoreModelActions {
  setName: Action<this, string>;
  setCourse: Action<this, string>;
}

export interface IStoreModelThunks {
  updateDataThunk: Thunk<this, IUpdateDataPayload>;
}

export interface IStoreModel
  extends IStoreModelState,
    IStoreModelActions,
    IStoreModelThunks {}

const model: IStoreModel = {
  name: 'foo',
  course: 'bar',
  setName: action((state, payload) => {
    state.name = payload;
  }),
  setCourse: action((state, payload) => {
    state.course = payload;
  }),
  updateDataThunk: thunk((actions, payload) => {
    actions.setName(payload.name);
    actions.setCourse(payload.course);
  }),
};

export default model;
