import classNames from 'classnames';
import React from 'react';
import styles from './head-lock.less';
import { Layout,Icon } from 'antd';

type HeadLockProps = {
  isMobile: boolean;
  siteName: React.ReactNode;
  logo: React.ReactNode;
  collapsed:boolean;
  drawerOpen:boolean;
  toggleDrawer: (x:React.MouseEvent<HTMLElement>)=>void;
  toggleSider: (x:any)=>void;
  collapsedWidth?: number;
};
const HeadLock: React.SFC<HeadLockProps> = ({ isMobile, collapsed, siteName, logo,drawerOpen,toggleDrawer,toggleSider,collapsedWidth=64 }) => {
  return (
    <Layout.Sider 
      className={classNames(styles.nameLocker)} 
      theme="light" 
      collapsed={isMobile || collapsed}
      collapsedWidth={collapsedWidth}
    >
    <div className={styles.lockerContent}>
      {
        !drawerOpen && (!collapsed && !isMobile) && [
          <div key={1} className={styles.logo}>{logo}</div>,
          !collapsed && <div key={2} className={styles.siteName}>{siteName}</div>
          
        ]}
      {
        !drawerOpen && (
          <div className={styles.toggler}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={isMobile ? toggleDrawer : toggleSider}
              style={{ padding: '5px 10px', cursor: 'pointer' }}
            />
          </div>
        )
      }
    </div>
    </Layout.Sider>
  );
};
export default HeadLock;
