import React, { PureComponent } from 'react';
import styles from './styles.less';
import {Menu} from 'antd';
import WithMenu, { WithMenuProps } from '../hocs/with-menu';
import { MenuMode } from 'antd/lib/menu';

interface Props extends WithMenuProps {
    mode?: MenuMode;
}

class HeaderMenu extends PureComponent<Props> {
	render() {
		const {menus, mode= "horizontal"} = this.props;
		return (
			<div className={styles.headerInner}>
				<Menu mode={mode}>
                    {this.props.getNavMenuItems(menus)}
				</Menu>
			</div>
		);
	}
}

export default WithMenu("header")<Props>(HeaderMenu);
