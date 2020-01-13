import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from '../../../global.less';
import UserList from '../../../components/parts/users/list';
import { User, Authority, Group } from '@/models/models';
import { T_Dispatch, Loading } from 'typings';
import RouteWrapper, { RouteWrapperState, RouteWrapperProps } from '@/utils/route-wrapper';
import { routerRedux } from 'dva/router';
import ViewMenu from '@/components/parts/common/sub-menu';
import AUTH from '@/utils/authorized';

interface InnerProps extends RouteWrapperProps {
  authorities: Array<Authority>;
  dispatch: T_Dispatch;
  groups: Group[];
  users: Array<User>;
  user: User;
  loading: Loading;
  settings: object;
  isMobile: boolean;
}
interface InnerState extends RouteWrapperState {}

class Users extends RouteWrapper<InnerProps, InnerState> {
  constructor(props: InnerProps) {
    super(props);
    this.model = "users";
    this.state = {};

    this.refreshList = ["users"];
    this.handleFetchNext("users");
  }

  handleItemNew = () => {
    this.props.dispatch(routerRedux.push({ pathname: '/settings/users/new' }));
  };

  render() {
    const { loading, users } = this.props;

    let fetching=loading.effects['users/fetch'] || loading.effects['users/get'];

    const MenuButtons= {
        back:{},
        add:{
          disabled: !AUTH.Has("USR_ADD")
        },
        refresh:{
            disabled:fetching,
            loading:fetching
        }
    }

    return (
      <AUTH.Route redirectPath="/" authority={["USR_VIEW"]}>
      <>
        <ViewMenu
          title="User management"
          onItemClick={this.handleSubMenuClick}
          isMobile={this.props.isMobile}
          buttons={MenuButtons}
        />
        <UserList users={users} />
      </>
      </AUTH.Route>
    );
  }
}

export default connect(({ root, users, authorities, loading, groups }) => ({
  user: root.auth.user,
  users: users,
  groups: groups,
  authorities: authorities,
  loading,
}))(Users);
