import moment from 'moment';
import { Auth } from 'typings';
/**
 * Received when token is parsed
 * issued at, expires, user_id and clientId
 */
export interface TokenContent {
  iat: number;
  exp: number;
  _id?: string;
  id?: string;
  scope?: string[];
  clientId?: string;
  username?: string;
}

export function parseJwt(token: string): TokenContent {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export function getAuth(): Promise<Auth> {
  return new Promise((res, rej) => {
    const auth: Auth = getAuthSync();
    if (!auth) rej(auth);
    else res(auth);
  });
}

export function getAuthSync(): Auth {
  const authJSON = localStorage.getItem('auth');
  if (!authJSON) return null;
  const auth: Auth = JSON.parse(authJSON);
  if (auth && moment(auth.expires).isSameOrBefore(moment())) {
    return auth;
  }
  return null;
}

export function getAuthority(): Array<string> {
  let auth = getAuthSync();
  return auth ? auth.scope : [];
}
