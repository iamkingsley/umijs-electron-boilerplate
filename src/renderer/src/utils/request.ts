import fetch from 'dva/fetch';
import http from 'http';
import { getAuth } from './authority';
import { Auth } from 'typings';
import { User } from '@/models/models';

// const api = 'http://127.0.0.1:3000';
// const api = 'http://192.168.43.28:3000';
const api = 'https://nexans.herokuapp.com';

function parseJSON(response) {
  return response.json();
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  let msg = false;
  try {
    msg = await parseJSON(response);
  } catch (error) {}
  const error = new Error((msg && msg.message) || response.statusText);
  error.response = msg;
  throw error;
}

//check if token refreshed and save in
// localStorage and sessionStorage
function CheckToken(response) {
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(uri: string, options: any = {}): Promise<any> {
  return getAuth().then((auth: Auth) => {
    if (!options.headers) {
      options.headers = {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: 'jwt ' + auth.token,
      };
    }
    // console.log(api + uri, options);
    return fetch(api + uri, options)
      .then(checkStatus)
      .then(CheckToken)
      .then(parseJSON);
    // .catch(err => ({ err }));
  });
}
export interface LoginResponse {
  user: User;
  token: string;
}

export function login(username: string, password: string): Promise<LoginResponse> {
  let options = {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      accept: 'application/json',
    }),
    body: JSON.stringify({ username, password }),
  };
  let url = api + '/public/users/login';

  // console.log(url, options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => console.log(err));
}
