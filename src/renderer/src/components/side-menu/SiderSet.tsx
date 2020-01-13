import React, { Component } from 'react';
import { Layout, Icon, Menu, Row, Col } from 'antd';
import { urlToList } from '../../utils';
import classNames from 'classnames';

// @ts-ignore
import styles from './styles.less';
import { Link } from 'dva/router';
import SiderHelper from './sider-helper';
import HeadLock from '../header/head-lock';
import { conversionPath } from '@/utils/menu-utils';
import WithMenu, { WithMenuProps } from '../hocs/with-menu';
import { MenuTheme } from 'antd/lib/menu';
import { MenuItem } from '@/common/typings';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface Props extends WithMenuProps {
  drawerOpen: boolean;
  isMobile: boolean;
  mode?: string;
  siteName: string;
  logo: any;
  onMenuClick: (x: object) => void;
  onCollapse: (x: boolean) => void;
  collapsed: boolean;
  menuWidth: number;
  collapsible: boolean;
  collapsedWidth?: number;
}

interface State extends React.ComponentState {
  openKeys: Array<string>;
}

class SiderSet extends Component<Props, State> {
  menus: Array<object>;
  flatMenuKeys: Array<string>;

  constructor(props: Props) {
    super(props);
    this.menus = props.menus;
    this.flatMenuKeys = SiderHelper.getFlatMenuKeys(props.menus);
    this.state = {
      openKeys: SiderHelper.getDefaultCollapsedSubMenus<Props>(props, this.flatMenuKeys),
    };
  }

  handleMenuClick = () => this.props.onMenuClick({ key: 'logout' });

  getIcon = icon => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
    }
    if (typeof icon === 'string') {
      return <Icon type={icon} />;
    }
    return icon;
  };

  getNavMenuItems = (menus: MenuItem[]) => {
    if (!menus) {
      return [];
    }
    return menus
      // .filter(item => item.name && !item.hideInSider)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);

      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {this.getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      // return <Menu.Item key={item.path}>{this.getMenuItemPath(item, false)}</Menu.Item>;
      return this.getSingleMenuItem(item);
    }
  };

  checkPermissionItem = (authority, ItemDom) => {
    /* if (this.props.Authorized && this.props.Authorized.check) {
       const { check } = this.props.Authorized;
       return check(authority, ItemDom);
     }*/
    return ItemDom;
  };

  getMenuItemPath = item => {
    let { mode, isMobile, onCollapse } = this.props;
    const itemPath = conversionPath(item.path);
    const icon = this.getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon} <span>{name}</span>
      </Link>
    );
  };

  getSingleMenuItem = item => <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;

  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };

  isMainMenu = key => {
    return this.props.menus.some(item => key && (item.key === key || item.path === key));
  };

  getSelectedMenuKeys = (): string[] => {
    const {
      location: { pathname },
      menus,
    } = this.props;
    const flatMenuKeys = SiderHelper.getFlatMenuKeys(menus);
    return urlToList(pathname).map(itemPath =>
      SiderHelper.getMenuMatchKeys(flatMenuKeys, itemPath).pop()
    );
  };

  render() {
    const { onCollapse, collapsed, isMobile, menus = [], collapsedWidth=64, collapsible } = this.props;

    let { openKeys } = this.state;

    let selectedKeys = this.getSelectedMenuKeys();
    if (selectedKeys.length === 0) {
      selectedKeys = [openKeys[openKeys.length - 1]]; //last item
    }
    let theme: MenuTheme = 'light';

    return (
      <Sider
        trigger={null}
        collapsed={collapsed && !isMobile}
        // breakpoint="md"
        onCollapse={onCollapse}
        theme={theme}
        className={styles.sider}
        collapsible={collapsible}
        collapsedWidth={collapsedWidth}
      >
        <Menu
          theme={theme}
          defaultSelectedKeys={[]}
          selectedKeys={selectedKeys}
          onOpenChange={this.handleOpenChange}
          openKeys={openKeys}
          mode="inline"
          style={collapsed?{width:collapsedWidth}:undefined}
        >
          {this.props.getNavMenuItems(menus)}
        </Menu>
      </Sider>
    );
  }
}

export default WithMenu("sidebar")(SiderSet);
