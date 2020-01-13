import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import ViewMenu from '@/components/parts/common/sub-menu';
import { User, Authority, Client, Group } from '@/models/models';
import { T_Dispatch, Loading } from 'typings';
import RouteWrapper, { RouteWrapperState, RouteWrapperProps } from '@/utils/route-wrapper';
import GroupForm from '@/components/parts/groups/group-form';
import { match } from 'dva/router';
import AUTH from '@/utils/authorized';
import { Card } from 'antd';
import DeleteDialogue from '@/components/parts/common/delete-dialogue';
import layoutStyles from '@/common/styles/layout.less';

interface InnerProps extends RouteWrapperProps {
  authorities: Array<Authority>;
  dispatch: T_Dispatch;
  groups: Group[];
  //   clients: Array<Client>;
  //   client: Client;
  //   users: Array<User>;
  //   user: User;
  loading: Loading;
  settings: object;
  isMobile: boolean;
  match: match<{ id: string }>;
}

interface InnerState extends RouteWrapperState {
  formData: Group;
}

class Groups extends RouteWrapper<InnerProps, InnerState> {
  constructor(props: InnerProps) {
    super(props);
    this.model = 'groups';
    this.state = {
      formData: null,
    };

    this.refreshList = [];
    this.handleFetchNext('groups');
  }

  handleItemSave = () => {
    this.formRef.handleSubmit();
  };

  componentWillMount = () => {
    const { id } = this.props.match.params;
    const item = this.props.groups.find(i => i._id.toString() === id);
    if (item) this.setState({ formData: { ...item }, item });
    else this.handleFetchItem(id);
  };

  handleFetchItem = (id: string) => {
    this.props.dispatch({
      type: 'groups/get',
      id,
      done: (err, item) => {
        if (err) this.handleNotFound();
        else this.setState({ formData: { ...item }, item });
      },
    });
  };

  render() {
    const { loading } = this.props;

    const { formData, item } = this.state;
    let savingOrDeleting = loading.effects['groups/save'] || loading.effects['groups/remove'];
    let fetching = loading.effects['groups/fetch'] || loading.effects['groups/get'];

    const MenuButtons = {
      back: {},
      save: {
        disabled: savingOrDeleting || !AUTH.Has('GRP_EDIT'),
        loading: loading.effects['groups/save'],
      },
      delete: {
        disabled: savingOrDeleting || !AUTH.Has('GRP_REMOVE'),
        loading: loading.effects['groups/remove'],
      },
      reset: {
        disabled: savingOrDeleting,
      },
      refresh: {
        disabled: fetching,
        loading: fetching,
      },
    };

    return (
      <AUTH.Route authority={['GRP_VIEW']} redirectPath="/">
        <>
          <ViewMenu
            title={"Group"+(item ? ": "+item.name :"")}
            onItemClick={this.handleSubMenuClick}
            isMobile={this.props.isMobile}
            buttons={MenuButtons}
          />
          {item ? (
            
            <div className={layoutStyles.viewBox}>
              <GroupForm
                key={1}
                onSubmit={this.handleItemSaveOk}
                onChange={this.handleFormFieldChange}
                onRef={this.setRef}
                loading={loading}
                item={formData}
              />
              <DeleteDialogue
                key={2}
                visible={this.state.delete_modal_visible}
                onCancel={this.handleModalCancel}
                className={styles.deleteModal}
                onOk={this.handleItemDeleteOk}
                maskClosable={false}
                okText="Yes, remove"
                name={item && item.name}
              />
            </div>
            
          ) : (
            <Card loading={true} />
          )}
        </>
      </AUTH.Route>
    );
  }
}

export default connect(({ root, groups, authorities, loading }) => ({
  groups,
  authorities: authorities,
  loading,
}))(Groups);
