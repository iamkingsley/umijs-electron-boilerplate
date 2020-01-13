import React,{ Component } from "react";
import { Menu, Icon } from "antd";
// @ts-ignore
import styles from "./styles.less";

interface Props extends React.Props<any>{
  handleOpenChange:(x:any)=>void;
  selectedKeys: string[];
  openKeys: string[];
  mode: string;
  title: string;
  theme: string;
  width:number;
  icon:string;
}

interface State extends React.ComponentState {
  openKeys:Array<string>
}

class MenuBar extends Component<Props,State> {
  state:State = {
    openKeys: []
  };
  render() {
    const {
      handleOpenChange,
      selectedKeys,
      mode,
      openKeys,
      width,
      theme,
      title,
      icon
    } = this.props;

    return (
      <Menu
        style={{ width: `${width}px`, height: "90%" }}
        defaultSelectedKeys={[]}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode={mode}
        theme={theme}
      >
        {title && (
          <Menu.Item key="title" className={styles.menuBarTitle}>
            {icon && <Icon type={icon} />}
            <span>{title}</span>
          </Menu.Item>
        )}
        {this.props.children}
      </Menu>
    );
  }
}

export default MenuBar;
