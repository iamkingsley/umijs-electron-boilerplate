import React from 'react';
// @ts-ignore
import UnAuthLayout from './unauth-layout';
import AuthLayout from './auth-layout';
import { connect } from 'dva';
import { RootModel } from '@/models/root';
import { T_Dispatch } from 'typings';

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
  root: RootModel;
  dispatch: T_Dispatch;
}

const BasicLayout: React.FunctionComponent<BasicLayoutProps> = props => {
  const isAccountPath = (): boolean => {
    return props.location.pathname.indexOf('/account') === -1;
  };

  return isAccountPath() ? (
    <AuthLayout
      children={props.children}
      root={props.root}
      location={props.location}
      dispatch={props.dispatch}
    />
  ) : (
    <UnAuthLayout children={props.children} />
  );
};

export default connect(({ root }) => ({ root }))(BasicLayout);
