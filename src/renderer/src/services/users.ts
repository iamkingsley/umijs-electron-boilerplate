import * as groups from './groups';
import request, * as req from '../utils/request';
import { parseJwt, getAuth } from '../utils/authority';
import { Auth } from 'typings';
import { User } from '@/models/models';

const default_scope = [
  'USR_ADD',
  'USR_VIEW',
  'USR_EDIT',
  'USR_REMOVE',
  'USR_PROFILE',
  'GRP_EDIT',
  'GRP_ADD',
  'GRP_REMOVE',
  'GRP_VIEW',
];

export const getAuthorities = user => {
  let options = { selector: { _id: { $in: user.group_ids } } };
  let auths = [];
  return groups.fetch(options).then(ugroups => {
    ugroups.map(x => {
      if (x.auths) {
        auths = [...auths, ...x.auths];
      }
      return x;
    });
    return auths;
    /*return new Promise(res=>{
		})*/
  });
};

export const login = async (username: string, password: string): Promise<Auth> => {
  try {
    let { token, user } = await req.login(username, password);
    const token_data = parseJwt(token);
    if (!user) user = { _id: token_data.id, username: token_data.username } as User;
    const auth: Auth = {
      token,
      user,
      loginTime: Date.now().valueOf(),
      expires: token_data.exp,
      scope: token_data.scope || default_scope,
    };
    localStorage.setItem('auth', JSON.stringify(auth));
    return auth;
  } catch (e) {
    throw e;
  }
};

export const logout = async (): Promise<any> => {
  try {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('root');
  } catch (e) {
    throw e;
  }
};

let base = '/api/users';

export const get = id => {
  return request(`${base}/${id}`);
};

export const fetch = (options = {}) => {
  return request(base, options);
};

export const save = data => {
  let path = base;
  let method = 'POST';
  if (data._id) {
    path = path + '/' + data._id;
    method = 'PUT';
  } else {
    delete data._id;
  }

  let options = {
    body: JSON.stringify(data),
    method,
  };
  // throw data;
  return request(path, options);
};

export const changePass = data => {
  let path = base;
  let method = 'PUT';
  path = path + '/' + data._id; //+'/password';

  let options = {
    body: JSON.stringify(data),
    method,
  };
  // throw data;
  return request(path, options);
};

export const remove = id => {
  let options = { method: 'DELETE' };
  return request(`${base}/${id}`);
};
