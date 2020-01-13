import React from 'react';
// @ts-ignore
import styles from './index.less';
import { Redirect, routerRedux } from 'dva/router';
import { Auth, T_Dispatch } from 'typings';
import { Layout, Icon, message } from 'antd';
import { getMenuData } from '../common/menu';
import SideMenu from '@/components/side-menu';
import { RootModel } from '@/models/root';
import HeadLock from '@/components/header/head-lock';
import MainHeader from '@/components/header';

const { Content, Header } = Layout;

interface Props extends React.Props<any> {
  root: RootModel;
  location: Location;
  dispatch: T_Dispatch;
}
interface State extends React.ComponentState {
  collapsed: boolean;
  drawerOpen: boolean;
}
class AuthLayout extends React.Component<Props, State> {
  state: State = {
    collapsed: false,
    drawerOpen: false,
  };
  /**
   *
   */
  constructor(props) {
    super(props);
    this.toggleSider = this.toggleSider.bind(this);
  }
  toggleSider = collapsed => {
    this.setState({
      collapsed: !this.state.collapsed,
      drawerOpen: !collapsed,
    });
  }

  toggleDrawer = to => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  handleMenuClick = ({ key }) => {
    const { dispatch, root } = this.props;
    switch (key) {
      case 'logout':
        dispatch({ type: 'root/logout' });
        break;
      case 'lock_screen':
        dispatch({ type: 'root/lock_screen' });
        break;
      case 'profile':
        dispatch(
          routerRedux.push({
            pathname: '/settings/profile/',
          }),
        );
        break;
      default:
        message.warning('Unknown action');
        break;
    }
  }

  render() {
    const {
      root: { auth, isMobile },
      children,
      location,
    } = this.props;
    const { collapsed, drawerOpen } = this.state;
    const siteName = 'P.O.S System';
    const logo = <Icon type="appstore" style={{ fontSize: '30px' }} />;
    const menus = getMenuData();
    return auth ? (
      <Layout style={{ height: '100vh', overflowY: 'hidden' }}>
        <Layout style={{flexGrow: 0}}>
          <HeadLock
            siteName={siteName}
            isMobile={isMobile}
            collapsed={isMobile || collapsed}
            logo={logo}
            toggleSider={this.toggleSider}
            toggleDrawer={this.toggleDrawer}
            drawerOpen={drawerOpen}
          />
          <Layout>
            {
              <MainHeader
                isMobile={isMobile}
                menus={menus}
                location={this.props.location}
                user={auth.user}
                onMenuClick={this.handleMenuClick}
              />
            }
          </Layout>
        </Layout>

        <Layout style={{height: "calc(100vh - 64px)" }}>
          <SideMenu
            drawerOpen={drawerOpen}
            onDrawerTogle={this.toggleDrawer}
            menus={menus}
            location={location}
            onCollapse={this.toggleSider}
            collapsed={collapsed}
            isMobile={isMobile}
            onMenuClick={this.handleMenuClick}
            mode="inline" // inline,vertical
            logo={logo}
            siteName={siteName}
          />
          <Content className="mainContent">{children}</Content>
        </Layout>
      </Layout>
    ) : (
      <Redirect to="/account/login" />
    );
  }
}
export default AuthLayout;
