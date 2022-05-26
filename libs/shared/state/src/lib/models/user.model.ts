import { Computed, computed, Thunk, thunk, Action, action } from 'easy-peasy';
import { Injections } from '@chapp/shared-state';
import { IStoreModel } from './';
import { User as UserModel, Room as RoomModel } from '@prisma/client';

interface IUserModelState {
  name: string;
  user: UserModel;
  room: RoomModel;
  hasRoom: Computed<this, boolean>;
}

interface IUserModelActions {
  setUsername: Action<this, string>;
  setUser: Action<this, UserModel>;
  setRoom: Action<this, RoomModel>;
  resetRoom: Action<this>;
}

interface IUserModelThunks {
  joinRoomThunk: Thunk<IUserModel, RoomModel, Injections, IStoreModel>;
  leaveRoomThunk: Thunk<IUserModel, RoomModel, Injections, IStoreModel>;
}

export interface IUserModel
  extends IUserModelState,
    IUserModelActions,
    IUserModelThunks {}

export const userModel: IUserModel = {
  name: '',
  user: {} as UserModel,
  room: {} as RoomModel,
  hasRoom: computed((state) => {
    return Object.keys(state.room).length > 0;
  }),
  // ACTIONS
  setUsername: action((state, payload) => {
    state.name = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setRoom: action((state, payload) => {
    state.room = payload;
  }),
  resetRoom: action((state) => {
    state.room = {} as RoomModel;
  }),
  // THUNKS
  joinRoomThunk: thunk(
    async (actions, room, { injections, getState, getStoreActions }) => {
      const { DataService } = injections;
      const user = await DataService.findUsernameOrCreate(getState().name);
      actions.setUser(user);
      const { setRoom } = getStoreActions().roomModel;
      DataService.joinRoom(user.id, room.id).then((room: RoomModel) => {
        actions.setRoom(room);
        setRoom(room);
      });
    }
  ),
  leaveRoomThunk: thunk(
    async (actions, room, { injections, getState, getStoreActions }) => {
      console.log(getState().room);
      console.log(room);
      const { DataService } = injections;
      const user = await DataService.findUsernameOrCreate(getState().name);
      const { resetRoom } = getStoreActions().roomModel;
      DataService.leaveRoom(user.id, room.id).then(() => {
        actions.resetRoom();
        resetRoom();
      });
    }
  ),
};
