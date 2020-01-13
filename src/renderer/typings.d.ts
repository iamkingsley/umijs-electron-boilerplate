import { User } from '@/models/models';

declare module '*.css';
declare module '*.png';

export interface T_DispatchDoneFn {
  (error: Error, result: any): void;
}

interface T_DispatchAction {
  readonly type: string;
  readonly done?: T_DispatchDoneFn;
  readonly [propName: string]: any;
}

interface T_ReducerAction {
  readonly type: string;
  readonly [propName: string]: any;
}
export interface T_Dispatch {
  (param: T_DispatchAction): any;
}

export interface T_Saga {
  put: Function;
  call: Function;
  select: Function;
  take: Function;
  fork: Function;
}

export interface T_DVA_Subscribe {
  dispatch: T_Dispatch;
  history: History;
}

export interface T_DVA_Loading {
  effects: {};
  models: {};
}

export interface Auth {
  token: string;
  user: User;
  loginTime: number; //date
  expires: number;
  scope: string[];
}

export type Loading = {
  effects: string[];
  models: string[];
};
