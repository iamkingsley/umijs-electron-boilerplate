import React from 'react';
import CheckPermissions, { Has } from './CheckPermissions';
import { Secured, Tauthority, check } from './index.d';
import AuthorizedRoute from './AuthorizedRoute';

interface AuthorizedProps {
  authority: Tauthority;
  noMatch?: React.ReactNode;
}

class Authorized extends React.Component<AuthorizedProps, any> {
  static Secured: Secured;
  static Route: typeof AuthorizedRoute;
  static Check: check;
  static Has: typeof Has;
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
