import { login, fetch, save, get, remove, changePass } from '../services/users';

import { Deduplicate } from '../utils';
import { User } from './models';
import { T_DVA_Subscribe, T_DispatchAction, T_Saga, Auth } from 'typings';

const initialState: Array<User> = [];

export default {
  namespace: 'users',

  state: initialState,

  subscriptions: {
    setup({ dispatch, history }: T_DVA_Subscribe) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch<T, U>({ done }: T_DispatchAction, { call, put, select }: T_Saga): IterableIterator<U> {
      try {
        const list = yield call(fetch);
        console.log(list);
        yield put({ type: 'save_list', list });
        if (done) yield call(done, null, list);
      } catch (e) {
        if (done) yield call(done, e);
      }
    },

    *get<T, U>({ done, id }, { call, put, select }): IterableIterator<U> {
      try {
        let item = yield call(get, id);
        yield put({ type: 'save_list', list: [item] });
        yield call(done, null, item);
      } catch (e) {
        yield call(done, e);
      }
    },

    *save<T, U>({ payload, done }, { call, put }): IterableIterator<U> {
      let type = payload._id ? 'save_item' : 'add_item';
      try {
        const user = yield call(save, payload);
        yield put({ type, payload: user });
        if (typeof done === 'function') {
          yield call(done, null, user);
        }
      } catch (e) {
        yield call(done, e);
      }
    },

    *changePass<T, U>({ payload, done }, { call, put }): IterableIterator<U> {
      let type = payload._id ? 'save_item' : 'add_item';
      try {
        const user = yield call(changePass, payload);
        yield put({ type, payload: user });
        if (typeof done === 'function') {
          yield call(done, null, user);
        }
      } catch (e) {
        yield call(done, e);
      }
    },

    *login<T, U>(
      { done, payload: { username, password } }: T_DispatchAction,
      { call }: T_Saga
    ): IterableIterator<U> {
      try {
        let auth: Auth = yield call(login, username, password);
        yield call(done, null, auth);
      } catch (e) {
        yield call(done, e);
      }
    },

    *remove<T, U>({ payload, done }, { call, put }): IterableIterator<U> {
      try {
        yield call(remove, payload);
        yield put({ type: 'remove_item', payload });
        yield call(done, null);
      } catch (e) {
        yield call(done, e);
      }
    },
  },

  reducers: {
    save_item(state, { payload }) {
      return state.map(i => (i._id !== payload._id ? i : payload));
    },
    add_item(state, { payload }) {
      return [payload, ...state];
    },
    save_list(state, { list }) {
      return Deduplicate([...list, ...state], '_id');
    },
    remove_item(state, { payload }) {
      return state.filter(i => i._id !== payload._id);
    },
    clear_list(state) {
      return [];
    },
  },
};
