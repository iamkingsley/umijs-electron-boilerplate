import React, { Component } from 'react';
import { Menu, Icon} from 'antd';
import { conversionPath } from '@/utils/menu-utils';
import { Link } from 'dva/router';
import { MenuItem } from '@/common/typings';
const { SubMenu } = Menu;

export interface WithMenuProps{
    menus:MenuItem[],
    location: Location,  
    isMobile?: boolean;
    onCollapse?: (x: boolean) => void;  
    getNavMenuItems?:(menus: MenuItem[])=>React.ReactNode[],
    getSubMenuOrItem?:(menus: MenuItem)=>React.ReactNode[],
    getSingleMenuItem?:(menus: MenuItem)=>React.ReactNode,
}

const WithMenu = (type:string)=><T extends {}>(WrappedComponent) => {
    return class WMenu extends Component<WithMenuProps & T> {
    getIcon = (icon: string|typeof Icon):React.ReactNode => {
        if (typeof icon === 'string' && icon.indexOf('http') === 0) {
          return <img src={icon} alt="icon" className={`sider-menu-item-img`} />;
        }
        if (typeof icon === 'string') {
          return <Icon type={icon} />;
        }
        return icon;
      };
    
    getNavMenuItems = (menus: MenuItem[]):React.ReactNode[] => {
    return !menus ? [] : menus
        .filter(item => item.name && (type == "header" && !item.hideInHeader || type=="sidebar" && !item.hideInSider))
        .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
        })
        .filter(item => item);
    };
    
      getSubMenuOrItem = (item: MenuItem):React.ReactNode => {
        if (item.children && item.children.some(child => !!child.name)) {
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
    
      getSingleMenuItem = (item:MenuItem):React.ReactNode => <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;

      getMenuItemPath = (item:MenuItem) => {
        const {isMobile,onCollapse}=this.props;
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
          isMobile && type==="sidebar"
            ? () => {
                onCollapse && onCollapse(true);
              }
            : undefined
        }
      >
    {icon} <span>{name}</span>
        
      </Link>
    );
    };

    render() {
      const myProps = {
        getNavMenuItems: this.getNavMenuItems,
        getSubMenuOrItem: this.getSingleMenuItem,
        getSingleMenuIte: this.getSingleMenuItem
      };

      return  (
        <WrappedComponent {...this.props} {...myProps} />
      );
    }
  };
};

export default WithMenu;
