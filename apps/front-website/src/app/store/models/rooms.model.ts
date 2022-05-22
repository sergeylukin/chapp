import { Thunk, thunk, Action, action } from 'easy-peasy';
import { IRoom } from './room.model';

export interface IRoomsState {
  rooms: IRoom[];
}
export interface IRoomsActions {
  clear: Action<this>;
  fetched: Action<this, IRoom[]>;
}
export interface IRoomsThunks {
  fetch: Thunk<this>;
}
export interface IRoomsModel extends IRoomsState, IRoomsActions, IRoomsThunks {}

export const roomsModel: IRoomsModel = {
  rooms: [],
  // Actions
  clear: action((state) => {
    state.rooms = [];
  }),
  fetched: action((state, rooms) => {
    state.rooms = rooms;
  }),
  // Thunks
  fetch: thunk(async (actions) => {
    const response = await fetch('/api/rooms');
    const rooms = await response.json();
    actions.fetched(rooms);
  }),
};
