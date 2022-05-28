import { Thunk, thunk, Action, action } from 'easy-peasy';
import { Room as RoomModel } from '@prisma/client';

export interface IRoomsState {
  rooms: RoomModel[];
}
export interface IRoomsActions {
  clear: Action<this>;
  fetched: Action<this, RoomModel[]>;
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
  fetch: thunk(async (actions, payload, { injections }) => {
    const { DataService } = injections;
    const rooms = await DataService.fetchRooms();
    actions.fetched(rooms);
  }),
};
