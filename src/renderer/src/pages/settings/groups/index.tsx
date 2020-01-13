import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from '../../../global.less';
import GroupList from '../../../components/parts/groups/list';
import { User, Authority, Client, Group } from '@/models/models';
import { T_Dispatch, Loading } from 'typings';
import RouteWrapper, { RouteWrapperState, RouteWrapperProps } from '@/utils/route-wrapper';
import { routerRedux } from 'dva/router';
import ViewMenu from '@/components/parts/common/sub-menu';
import AUTH from '@/utils/authorized';

interface InnerProps extends RouteWrapperProps {
  authorities: Array<Authority>;
  dispatch: T_Dispatch;
  clients: Array<Client>;
  groups: Group[];
  item: Group;
  users: Array<User>;
  user: User;
  loading: Loading;
  settings: object;
  isMobile: boolean;
}
interface InnerState extends RouteWrapperState {}

class Groups extends RouteWrapper<InnerProps, InnerState> {
  constructor(props: InnerProps) {
    super(props);
    this.model = 'groups';
    this.state = {};

    this.refreshList = ['groups'];
    this.handleFetchNext('groups');
  }

  handleItemNew = () => {
    this.props.dispatch(routerRedux.push({ pathname: '/settings/groups/new' }));
  };

  render() {
    const { loading, groups } = this.props;

    let fetching=loading.effects['groups/fetch'] || loading.effects['groups/get'];

    const MenuButtons= {
        back:{},
        add:{
          disabled: !AUTH.Has("GRP_ADD")
        },
        refresh:{
            disabled:fetching,
            loading:fetching
        }
    }

    return (
      <AUTH.Route redirectPath="/" authority={["GRP_VIEW"]}>
      <>
        <ViewMenu
          title="Access Groups"
          onItemClick={this.handleSubMenuClick}
          isMobile={this.props.isMobile}
          buttons={MenuButtons}
        />
        <GroupList groups={groups} />
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
}))(Groups);
