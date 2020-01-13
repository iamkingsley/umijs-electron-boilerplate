import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from '../../../global.less';
import ViewMenu from '@/components/parts/common/sub-menu';
import { Authority, User, Group } from '@/models/models';
import { T_Dispatch, Loading } from 'typings';
import RouteWrapper, { RouteWrapperState, RouteWrapperProps } from '@/utils/route-wrapper';
import UserForm from '@/components/parts/users/user-form';
import AUTH from '@/utils/authorized';


interface InnerProps extends RouteWrapperProps {
  authorities: Array<Authority>;
  groups: Group[];
  dispatch: T_Dispatch;
  users: Array<User>;
  // user: User;
  loading: Loading;
  settings: object;
  isMobile: boolean;
}
interface InnerState extends RouteWrapperState {
  formData: User
}


class NewUserP extends RouteWrapper<InnerProps, InnerState> {
  constructor(props: InnerProps) {
    super(props);
    this.model = 'users';
    this.state = {
      formData:null
    };

    this.refreshList = ["groups"];
    // this.handleFetchNext('users');
    this.handleListRefresh()
  }

  handleItemSave = () => {
    this.formRef.handleSubmit();
  };

  render() {
    const { loading,groups } = this.props;

    const {formData}=this.state;

    let fetching=loading.effects['users/fetch'] || loading.effects['users/get'] || loading.effects['groups/fetch'];
    const MenuButtons= {
      back:{},
      save:{
          loading:loading.effects['users/save'],
      },
      reset: {
      },
      refresh:{
          disabled:fetching,
          loading:fetching
      }
  }

    return (
      <AUTH.Route redirectPath="/settings/users" authority={["USR_ADD"]}>
      <>
        <ViewMenu
          onItemClick={this.handleSubMenuClick}
          isMobile={this.props.isMobile}
          buttons={MenuButtons}
        />
        <UserForm 
          onSubmit={this.handleItemSaveOk}
          onChange={this.handleFormFieldChange}
          onRef={this.setRef}
          loading={loading}
          item={formData}
          groups={groups}
          noPass={false}
        />
        </>
      </AUTH.Route>
    );
  }
}

export default connect(({ authorities, loading, groups,users }) => ({
  groups: groups,
  authorities: authorities,
  loading,
  users
}))(NewUserP);
