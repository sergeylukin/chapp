import { createStore, persist } from 'easy-peasy';
import model from './models';
import {
  UserService,
  IUserService,
} from '@justt/front-website/data-access-feed';

export interface Injections {
  UserService: IUserService;
}

const store = createStore(persist(model), {
  injections: {
    UserService,
  },
});

export default store;
