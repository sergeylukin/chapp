import { Computed, computed, Thunk, thunk, Action, action } from 'easy-peasy';
import { Injections } from '../';
import { IStoreModel } from './';
import { Room as RoomModel } from '@prisma/client';

interface IUserModelState {
  name: string;
  room: RoomModel;
  hasRoom: Computed<this, boolean>;
}

interface IUserModelActions {
  setUsername: Action<this, string>;
  setRoom: Action<this, RoomModel>;
}

interface IUserModelThunks {
  joinRoomThunk: Thunk<IUserModel, RoomModel, Injections, IStoreModel>;
}

export interface IUserModel
  extends IUserModelState,
    IUserModelActions,
    IUserModelThunks {}

export const userModel: IUserModel = {
  name: '',
  room: {} as RoomModel,
  hasRoom: computed((state) => {
    return Object.keys(state.room).length > 0;
  }),
  // ACTIONS
  setUsername: action((state, payload) => {
    state.name = payload;
  }),
  setRoom: action((state, payload) => {
    state.room = payload;
  }),
  // THUNKS
  joinRoomThunk: thunk(async (actions, room, { injections, getState }) => {
    const { UserService } = injections;
    const user = await UserService.findUsernameOrCreate(getState().name);
    UserService.joinRoom(user.id, room.id).then((room: RoomModel) => {
      actions.setRoom(room);
    });
  }),
};
