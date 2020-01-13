import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import ViewMenu from '@/components/parts/common/sub-menu';
import layoutStyles from '@/common/styles/layout.less';
import { User, Authority, Client, Group } from '@/models/models';
import { T_Dispatch, Loading } from 'typings';
import RouteWrapper, { RouteWrapperState, RouteWrapperProps } from '@/utils/route-wrapper';
import UserForm from '@/components/parts/users/user-form';
import { match, } from 'dva/router';
import AUTH from '@/utils/authorized';
import { Card, } from 'antd';
import DeleteDialogue from '@/components/parts/common/delete-dialogue';


interface InnerProps extends RouteWrapperProps {
  authorities: Array<Authority>;
  dispatch: T_Dispatch;
  groups: Group[];
//   clients: Array<Client>;
//   client: Client;
  users: Array<User>;
//   user: User;
  loading: Loading;
  settings: object;
  isMobile: boolean;
  match:match<{id:string}>;
}

interface InnerState extends RouteWrapperState {
  formData: User
}

class UserP extends RouteWrapper<InnerProps, InnerState> {
  constructor(props: InnerProps) {
        super(props);
        this.model = 'users';
        this.state = {
        formData:null
        };

        this.refreshList = ["groups"];
        this.handleFetchNext('users');
  }

  handleItemSave = () => {
        this.formRef.handleSubmit();
  };
 
  componentWillMount = () => {
      const {id}=this.props.match.params;
        const item=this.props.users.find(i=>i._id.toString()===id);
        if(item) this.setState({formData:{...item},item})
        else this.handleFetchItem(id)
        this.handleListRefresh()
  }
  
  handleFetchItem=(id:string)=>{
      this.props.dispatch({type:"users/get",id,done:(err,item)=>{
            if(err)
                this.handleNotFound()
            else
                this.setState({formData:{...item},item})
      }})
  }

  render() {
    const { loading,groups } = this.props;

    const {formData,item}=this.state;
    let savingOrDeleting=loading.effects['users/save'] || loading.effects['users/remove'];
    let fetching=loading.effects['users/fetch'] || loading.effects['users/get'] || loading.effects['groups/fetch'];

    const MenuButtons= {
        back:{},
        save:{
            disabled:savingOrDeleting || !AUTH.Has("USR_EDIT"),
            loading:loading.effects['users/save'],
        },
        delete:{
            disabled:savingOrDeleting || !AUTH.Has("USR_REMOVE"),
            loading:loading.effects['users/remove'],
        },
        reset: {
            disabled: savingOrDeleting
        },
        refresh:{
            disabled:fetching,
            loading:fetching
        }
    }
    
    return (
        <AUTH.Route authority={["USR_VIEW"]} redirectPath="/">
            <>
                <ViewMenu
                    title={"User: "+(item ? item.username : "")}
                    onItemClick={this.handleSubMenuClick}
                    isMobile={this.props.isMobile}
                    buttons={MenuButtons}
                />

                {
                    item ? 
                    (
                        <div className={layoutStyles.viewBox}>
                        <UserForm 
                            key={1}
                            onSubmit={this.handleItemSaveOk}
                            onChange={this.handleFormFieldChange}
                            onRef={this.setRef}
                            loading={loading}
                            item={formData}
                            noPass={true}
                            groups={groups}
                            profileMode={false}
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
                    )
                    :
                    <Card loading={true}/>
                }
            </>
        </AUTH.Route>

    );
  }
}

export default connect(({ root, groups, authorities, loading,users}) => ({
    users,
    groups,
    authorities: authorities,
    loading,
}))(UserP);



