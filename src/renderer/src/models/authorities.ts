import { T_DVA_Subscribe } from 'typings';
import { authList } from '@/common/authorities';

export default {
  namespace: 'authorities',

  state: authList,

  subscriptions: {
    setup({ dispatch, history }: T_DVA_Subscribe) {
      // eslint-disable-line
    },
  },

  effects: {
    *get<T, U>({ done, id }, { call, put, select }): IterableIterator<U> {
      try {
        let item = yield select(state => state.authorities.find(a => a._id === id));
        yield call(done, null, item);
      } catch (e) {
        yield call(done, e);
      }
    },
  },

  reducers: {
    save_item(state, { payload }) {
      return state.map(i => (i._id !== payload._id ? i : payload));
    },
  },
};
