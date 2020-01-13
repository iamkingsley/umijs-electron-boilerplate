import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from '../../../global.less';
import ViewMenu from '@/components/parts/common/sub-menu';
import { User, Authority, Client, Group } from '@/models/models';
import { T_Dispatch, Loading } from 'typings';
import RouteWrapper, { RouteWrapperState, RouteWrapperProps } from '@/utils/route-wrapper';
import GroupForm from '@/components/parts/groups/group-form';
import AUTH from '@/utils/authorized';


interface InnerProps extends RouteWrapperProps {
  authorities: Array<Authority>;
  groups: Group[];
  dispatch: T_Dispatch;
  // clients: Array<Client>;
  // client: Client;
  // users: Array<User>;
  // user: User;
  loading: Loading;
  settings: object;
  isMobile: boolean;
}
interface InnerState extends RouteWrapperState {
  formData: Group
}


class Groups extends RouteWrapper<InnerProps, InnerState> {
  constructor(props: InnerProps) {
    super(props);
    this.model = 'groups';
    this.state = {
      formData:null
    };

    this.refreshList = [];
    // this.handleFetchNext('groups');
  }

  handleItemSave = () => {
    this.formRef.handleSubmit();
  };

  render() {
    const { loading } = this.props;

    const {formData}=this.state;

    let fetching=loading.effects['groups/fetch'] || loading.effects['groups/get'];
    const MenuButtons= {
      back:{},
      save:{
          loading:loading.effects['groups/save'],
      },
      reset: {
      },
      refresh:{
          disabled:fetching,
          loading:fetching
      }
  }

    return (
      <AUTH.Route redirectPath="/settings/groups" authority={["GRP_ADD"]}>
      <>
        <ViewMenu
          onItemClick={this.handleSubMenuClick}
          isMobile={this.props.isMobile}
          buttons={MenuButtons}
        />
        <GroupForm 
          onSubmit={this.handleItemSaveOk}
          onChange={this.handleFormFieldChange}
          onRef={this.setRef}
          loading={loading}
          item={formData}
        />
        </>
      </AUTH.Route>
    );
  }
}

export default connect(({ authorities, loading, groups }) => ({
  groups: groups,
  authorities: authorities,
  loading,
}))(Groups);
