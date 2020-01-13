import { logout } from '../services/users';
import { T_Saga, T_DispatchAction, T_DVA_Subscribe, T_ReducerAction, Auth } from 'typings';

export interface RootModel {
  auth: Auth;
  isMobile: boolean;
}
const initialState: RootModel = {
  auth: null,
  isMobile: false,
};
export default {
  namespace: 'root',

  state: initialState,

  subscriptions: {
    setup({ dispatch, history }: T_DVA_Subscribe) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch<T, U>({ payload: any }: T_DispatchAction, { call, put }: T_Saga): IterableIterator<U> {
      // eslint-disable-line
      yield put({ type: 'save' });
    },

    *logout<T, U>(
      { done, token }: T_DispatchAction,
      { select, put, call }: T_Saga
    ): IterableIterator<U> {
      try {
        yield put({ type: 'do_logout' });
        yield call(logout, token);
      } catch (e) {
        throw e;
      }
    },
    *init<T, U>({ done, auth }: T_DispatchAction, { call, put }: T_Saga): IterableIterator<U> {
      try {
        yield put({ type: 'users/fetch', done: (e, res) => {} });
        // yield put({ type: 'clients/getCurrent', id: auth.user.clientId });
        yield put({ type: 'authorize', auth });
        yield call(done, null);
      } catch (err) {
        yield call(done, err);
      }
    },
  },

  reducers: {
    save(state: RootModel, action: T_ReducerAction) {
      return { ...state, ...action.payload };
    },
    authorize(state: RootModel, { auth }: T_ReducerAction) {
      return { ...state, auth };
    },
    do_logout(state: RootModel) {
      return { ...state, auth: null };
    },
  },
};
