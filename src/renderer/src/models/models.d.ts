import { ProductStatus } from '@/common/enums';
import moment = require('moment');

export interface Client {
  name: string;
  _id: string;
}

export interface User {
  name: string;
  username: string;
  email?: string;
  _id: string;
  clientId: string;
  groups: Array<string>;
  status: number;
  avatar?: string;
}

interface Times {
  createdAt?: string | moment.Moment
}

export interface UserPwdObj {
  password: string;
  confirm?: string;
  current?: string;
  _id: string;
}

export interface Group {
  name: string;
  _id: string;
  description: string;
  authorities: string[];
  status: number;
}

export interface Authority {
  name: string;
  _id: string;
  detail: string;
  children?: Array<Authority>;
}

export interface AppSettings {
  list_item_click_action: string;
}

export interface CableType {
  name: string;
  _id: string;
}

