import React from 'react';

export interface AccountLayoutProps {
  history?: History;
  location?: Location;
}

export default class AccountLayout extends React.Component<AccountLayoutProps, any> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
