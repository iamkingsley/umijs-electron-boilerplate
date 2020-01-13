import React from "react";
import {Layout,Avatar,Dropdown,Menu,Icon} from 'antd';
import classNames from 'classnames';
import styles from './styles.less';
// import HeaderSearch from './HeaderSearch';
import HeaderMenu from './header-menu';
import { User } from '@/models/models';
import { ClickParam } from 'antd/lib/menu';
import { MenuItem } from '@/common/typings';

type Props = {
	menus: Array<MenuItem>,
    location: Location,
    onMenuClick: (x:ClickParam)=>void;
    user: User,
    isMobile: boolean;
};

type State={
}
const { Header } = Layout;

class MainHeader extends React.Component<Props,State> {

	render() {
		const {
			user,
			onMenuClick,
			menus,
            location,
            isMobile
		} = this.props;

		
		const user_menu=(
			<Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
         <Menu.Item key="profile">
          <Icon type="user"/>Profile
        </Menu.Item>
        {/*
        <Menu.Item key="setting" >
          <Icon type="setting" />Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="lock_screen">
          <Icon type="lock" />Lock screen
        </Menu.Item> */}
        <Menu.Item key="logout">
          <Icon type="logout" />Logout
        </Menu.Item>
      </Menu>
			)
		return (
			<Header className={styles.headerMenu}>
				{/* <div className={styles.headerLeft}>
                    {!drawerOpen && (
                        <Icon
                            className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={isMobile ? toggleDrawer : toggleSider}
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                        />
                    )}
                </div> */}
				<div className={styles.headerRight}>
					{
                        !isMobile &&
						<div className={styles.headerNav}>
							<HeaderMenu location={location} isMobile={isMobile} menus={menus} mode="horizontal"/>
						</div>
					}
					<div className={styles.headerRightMenu}>
						<Dropdown overlay={user_menu} >
                        <div className={`${styles.action} ${styles.account}`}>
                            <span >
                            {
                                user && [(
                                user.avatar ?
                                <Avatar key="avatar" size="small" className={styles.avatar} src={user.avatar} />
                                :
                                <Icon type="user" key="icon" className={styles.icon}/>
                                ),
                                <span key="name" className={styles.username}>{user.username}&nbsp;</span>
                                ]
                                }
                            </span>
                            <span><Icon type="down" style={{color:"#ccc"}} /></span>
                            </div>
	                    </Dropdown>
					</div>
				</div>
			</Header>
		);
	}
}

export default MainHeader;
