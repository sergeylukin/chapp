import { createStore, persist } from 'easy-peasy';
import model from './models';
import { DataService, IDataService } from '@chapp/shared-data';

export interface Injections {
  DataService: IDataService;
}

const store = createStore(persist(model), {
  injections: {
    DataService,
  },
});

export default store;
