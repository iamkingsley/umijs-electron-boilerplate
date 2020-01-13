import React, { Component } from 'react';
import Drawer from 'rc-drawer';

import 'rc-drawer/assets/index.css';
import SiderSet from './SiderSet';

interface Props extends React.Props<any> {
  drawerOpen: boolean;
  isMobile: boolean;
  mode?: string;
  siteName: string;
  logo: any;
  onMenuClick: (x: object) => void;
  onCollapse: (x: boolean) => void;
  menus: Array<object>;
  location: Location;
  collapsed: boolean;
  onDrawerTogle:(x:any)=>void;
}
interface State extends React.ComponentState {
  collapsed: boolean;
}

class SideMenu extends Component<Props, State> {
  render() {
    let { drawerOpen, isMobile,onDrawerTogle, mode, ...others } = this.props;
    let options: any = { ...others };
    options.isMobile = isMobile;
    options.mode = isMobile ? 'inline' : mode;
    options.collapsible=!isMobile;
    // let menuWidth = isMobile ? 254 : mode === 'spread' ? 220 : 220;
    // options.menuWidth = menuWidth;

    return isMobile ? (
      <Drawer
        handler={false}
        showMask={true}
        width={"80vw"}
        open={drawerOpen}
        onMaskClick={onDrawerTogle}
        onHandleClick={onDrawerTogle}
      >
        <SiderSet {...options} />
      </Drawer>
    ) : (
      <SiderSet {...options} />
    );
  }
}

export default SideMenu;
