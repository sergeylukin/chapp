import { createStore, persist } from 'easy-peasy';
import model from './models';
import { DataService, IDataService } from '@chapp/shared-data';

export interface Injections {
  DataService: IDataService;
}

export const store = createStore(persist(model), {
  injections: {
    DataService,
  },
});
