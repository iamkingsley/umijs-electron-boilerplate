import React,{Component} from 'react';

//@ts-ignore
import styles from './styles.less';
import { Menu, Icon } from 'antd';

interface Props extends React.Props<any>{
  onToggleCollapse:(x:any)=>void;
  handleOpenChange:(x:any)=>void;
  selectedKeys: string[];
  mode: string;
}

interface State extends React.ComponentState{

}
class IconBar extends Component<Props,State> {
  
  state = {
    openKeys:[],
  }
  render() {
    
    const {
      handleOpenChange,
      selectedKeys,
      onToggleCollapse,
      mode,
    }=this.props;
    
    return (
        <Menu
          style={{ width: 50, height: '100%' }}
          defaultSelectedKeys={['/dashboard']}
          onOpenChange={handleOpenChange}
          selectedKeys={selectedKeys}
          defaultOpenKeys={['sub1']}
          mode={mode}
          theme={"light"}
        >
          <Menu.Item 
            className={styles.trigger}
            onClick={onToggleCollapse}
            key="trigger" 
          >
            <Icon type="bars" />
          </Menu.Item>
          {this.props.children}
        </Menu>
      )
  }
}

export default IconBar;
