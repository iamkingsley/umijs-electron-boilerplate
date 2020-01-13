import request, * as req from '../utils/request';
import { getAuthSync } from '../utils/authority';

let base = '/api/groups';

export const get = id => {
  return request(`${base}/${id}`);
};

export const fetch = (options = {}) => {
  // let auth = getAuthSync();
  // if (!auth) throw new Error('Not authenticated');
  return request(`${base}`, options);
};

export const fetchUsers = id => {
  return request(`${base}/${id}/users`, {});
};

//end
export const save = data => {
  let path = base;
  let method = 'POST';
  let id = data._id || data.id;
  if (id) {
    path = path + '/' + id;
    method = 'PUT';
  } else {
    delete data._id;
    delete data.id;
  }

  let options = {
    body: JSON.stringify(data),
    method,
  };
  //   console.log(options);
  // throw data;
  return request(path, options);
};

export const remove = id => {
  let options = { method: 'DELETE' };
  return request(`${base}/${id}`, options);
};
