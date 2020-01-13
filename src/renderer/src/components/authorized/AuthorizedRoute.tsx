import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';
import { RouteProps } from 'react-router';
import { Tauthority } from './index.d';

export interface AuthorizedRouteProps extends RouteProps {
  authority: Tauthority;
  redirectPath: string;
}

class AuthorizedRoute extends React.Component<AuthorizedRouteProps, any> {
  /**
   *
   */
  constructor(props) {
    super(props);
    this.showMatched = this.showMatched.bind(this);
    this.toLogin = this.toLogin.bind(this);
  }
  showMatched = (props): any => {
    const { component: Component, render, authority, redirectPath, ...rest } = this.props;
    return Component ? <Component {...props} /> : render ? render(props) : null;
  };

  toLogin = () => {
    const { component: Component, render, authority, redirectPath, ...rest } = this.props;
    return <Redirect to={{ pathname: redirectPath }} />;
  };
  render() {
    const { component: Component, render, authority, redirectPath, children, ...rest } = this.props;
    return (
      <Authorized authority={authority} noMatch={<Route {...rest} render={this.toLogin} />}>
        {render ? (<Route {...rest} render={this.showMatched} />) : (<Route {...rest}>{children}</Route>)}
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
