import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './profile.less';
import ViewMenu from '@/components/parts/common/sub-menu';
import { User, Authority, Group, UserPwdObj } from '@/models/models';
import { T_Dispatch, Loading } from 'typings';
import RouteWrapper, { RouteWrapperState, RouteWrapperProps } from '@/utils/route-wrapper';
import UserForm from '@/components/parts/users/user-form';
import { match } from 'dva/router';
import AUTH from '@/utils/authorized';
import { Card, Tabs, Modal, Button, message } from 'antd';
import AuthoritiesForm from '@/components/parts/groups/authorities-form';
import { authList } from '@/common/authorities';
import PasswordForm from '@/components/parts/users/password-form';
import layoutStyles from '@/common/styles/layout.less';

interface InnerProps extends RouteWrapperProps {
  authorities: Array<Authority>;
  dispatch: T_Dispatch;
  groups: Group[];
  user: User;
  users: Array<User>;
  loading: Loading;
  settings: object;
  isMobile: boolean;
  match: match<{ id: string }>;
}

interface InnerState extends RouteWrapperState {
  formData: User;
  activeTab: string;
  userAuths: string[];
  passModalVisible: boolean;
}

class UserP extends RouteWrapper<InnerProps, InnerState> {
  passFormRef: any;
  constructor(props: InnerProps) {
    super(props);
    this.model = 'users';
    this.state = {
      formData: null,
      activeTab: 'basic',
      userAuths: [],
      passModalVisible: false,
    };

    this.refreshList = ['groups'];
    // this.handleFetchNext('users');
  }

  componentDidMount = () => {
    const id = this.props.user._id;
    const item = this.props.users.find(i => i._id.toString() === id);
    if (item) this.setState({ formData: { ...item }, item });
    this.handleFetchItem(id);
    this.handleListRefresh();
  };

  handleFetchItem = (id: string) => {
    this.props.dispatch({
      type: 'users/get',
      id,
      done: (err, item) => {
        if (err) {
          this.handleNotFound();
        } else {
          this.setState({ formData: { ...item }, item }, () => {
            this.getAuthorities();
          });
        }
      },
    });
  };
  //tabs
  handleTabChange = (activeTab: string) => {
    if(activeTab==="password")
      this.togglePassModal()
    else 
      this.setState({ activeTab });
  };

  //tabs:basic
  handleItemSave = () => {
    this.formRef.handleSubmit();
  };
  //password
  setPassRef = v => (this.passFormRef = v);
  togglePassModal = () => this.setState({ passModalVisible: !this.state.passModalVisible });
  
  handlePasswordChange = (data: UserPwdObj) => {
    this.props.dispatch({
      type: 'users/changePass',
      payload: data,
      done: (err, user) => {
        if (err) message.warn('Password change failed');
        else this.setState({ item: user });
      },
    });
    this.togglePassModal();
  };

  //tabs:rights
  getAuthorities = () => {
    const { groups } = this.props;
    const { item } = this.state;
    let auths: string[] = [];
    groups.map(g => {
      if ((item.groups || []).includes(g._id)) auths = auths.concat(g.authorities);
    });
    this.setState({ userAuths: auths });
  };

  render() {
    const { loading, groups } = this.props;

    const { formData, item, activeTab, userAuths, passModalVisible } = this.state;
    let savingOrDeleting = loading.effects['users/save'] || loading.effects['users/remove'];
    let fetching =
      loading.effects['users/fetch'] ||
      loading.effects['users/get'] ||
      loading.effects['groups/fetch'];

    const MenuButtons = {
      back: {},
      save: {
        disabled: savingOrDeleting || !AUTH.Has('USR_EDIT'),
        loading: loading.effects['users/save'],
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
      <AUTH.Route authority={['USR_PROFILE']} redirectPath="/">
        <>
          <ViewMenu
            title="Profile"
            onItemClick={this.handleSubMenuClick}
            isMobile={this.props.isMobile}
            buttons={MenuButtons}
          />

          {item ? (
            <Tabs activeKey={activeTab} onChange={this.handleTabChange} type="card">
              <Tabs.TabPane tab="Basic Info" key="basic">
                <div className={layoutStyles.viewBox}>
                  <UserForm
                    onChange={this.handleFormFieldChange}
                    onSubmit={this.handleItemSaveOk}
                    onRef={this.setRef}
                    profileMode={true}
                    loading={loading}
                    item={formData}
                    noPass={true}
                    groups={groups}
                  />
                </div>
                <Modal
                  visible={passModalVisible}
                  onCancel={this.togglePassModal}
                  okText="Save"
                  onOk={() => this.passFormRef && this.passFormRef.handleSubmit()}
                >
                  <PasswordForm
                    onSubmit={this.handlePasswordChange}
                    onRef={this.setPassRef}
                    item={formData}
                  />
                </Modal>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Rights" key="rights">
                {userAuths.length > 0 && (
                  <AuthoritiesForm
                    authorities={authList}
                    loading={loading}
                    defaultChecked={userAuths}
                    checkable={true}
                    selectable={true}
                    disabled={true}
                  />
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Password" key="password">
                &nbsp;
              </Tabs.TabPane>
            </Tabs>
          ) : (
            <Card loading={true} />
          )}
        </>
      </AUTH.Route>
    );
  }
}

export default connect(({ root, groups, authorities, loading, users }) => ({
  users,
  user: root.auth.user,
  groups,
  authorities: authorities,
  loading,
}))(UserP);
