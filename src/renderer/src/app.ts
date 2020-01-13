import { enquireScreen } from 'enquire-js';
import { getAuthSync } from './utils/authority';
import { RootModel } from './models/root';
import { getSessionItem, sessionStore } from './utils';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

const auth = getAuthSync();
const _root = auth ? { auth } : getSessionItem<RootModel>('root') || {};

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
    onEffect: (effect, o, m, t) => {
      return action => {
        action =
          _root && _root.auth && _root.auth.user
            ? {
                ...action,
                token: _root.auth.token,
                user_id: _root.auth.user._id,
              }
            : action;

        return effect(action);
      };
    },
    onStateChange: state => {
      let _root = state.root; // for onEffect
      sessionStore<RootModel>('root', { ..._root, isMobile });
    },
    initialState: {
      root: { ..._root, isMobile },
    },
  },
};
