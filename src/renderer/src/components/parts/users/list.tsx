import React from 'react';
import { connect } from 'dva';
import styles from './list.less';
import { List, Icon, Table, Popover } from 'antd';
import classNames from 'classnames';

import TableColumnSelectorForm from '@/components/parts/common/table-column-selector';
import { routerRedux } from 'dva/router';
import ViewList, { ViewListProps, ViewListState } from '@/components/parts/common/view-list';
import { T_Dispatch, Loading } from 'typings';
import { AppSettings, Group } from '@/models/models';

function getColumns() {
  return [
    {
      key: "username",
      dataIndex: "username",
      canHide: true,
      title: "Login name",
      sorter: (a, b) => ("" + a.username).localeCompare(b.username),
      checked: true
    },
    {
      key: "fullName",
      dataIndex: "fullName",
      canHide: true,
      title: "Name",
      render: name => name || "N/A",
      sorter: (a, b) => ("" + a.fullName).localeCompare(b.fullName),
      checked: true
    },
    {
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      canHide: true,
      title: "Contact Number",
      sorter: (a, b) => ("" + a.phoneNumber).localeCompare(b.phoneNumber),
      checked: true
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      canHide: true,
      checked: true,
      render: s => (s === 1 ? "Active" : "Inactive"),
      sorter: (a, b) => ("" + a.status).localeCompare(b.status)
    }
  ];
}

interface Props extends ViewListProps {
  dispatch: T_Dispatch;
  settings: AppSettings;
  users: Group[];
  loading: Loading;
  isMobile: boolean;
}
interface State extends ViewListState {}

class GroupList extends ViewList<Props, State> {
  state = {
    popColumns: getColumns(),
    visiblePopColumnForm: false,
    activeCols: ["fullName", "username", "phoneNumber", "status"]
  };

  getColumns = () => getColumns();

  handleClick = item => {
    const { dispatch, settings } = this.props;
    let pathname = `/settings/users/${item._id}`;
    pathname += settings.list_item_click_action === 'overview' ? '' : `/update`;
    dispatch(routerRedux.push({ pathname }));
  };
  aa = item => this.handleClick(item);
  renderList = item => (
    <List.Item
      key={item._id}
      actions={[
        <a key={0} onClick={this.aa}>
          View
        </a>,
      ]}
      className={classNames(styles.listPanelItem, {})}
    >
      <List.Item.Meta title={item.name} />
    </List.Item>
  );
  render() {
    const { users, loading, isMobile } = this.props;

    let { activeCols, popColumns, visiblePopColumnForm } = this.state;

    return !isMobile ? (
      <div className={"tableContainer"}>
        <div className={"columnSetter"}>
          <Popover
            visible={visiblePopColumnForm}
            onVisibleChange={this.handlePopVisibilityChange}
            content={
              <TableColumnSelectorForm fields={popColumns} onSubmit={this.handleActiveColsChange} />
            }
            title="Select columns"
            trigger="click"
          >
            <Icon type="setting" />
          </Popover>
        </div>
        <Table
          dataSource={users}
          pagination={users.length > 20 ? { pageSize: 20 } : false}
        //   loading={loading.effects['users/fetch']}
          rowKey={this.setRowKey}
          columns={popColumns.filter(c => activeCols.includes(c.key))}
          onRow={this.handleTableRowClick}
        />
      </div>
    ) : (
      <List
        dataSource={users}
        loading={loading.effects['users/fetch']}
        renderItem={this.renderList}
        rowKey={this.setRowKey}
      />
    );
  }
}

export default connect(({ root, loading, settings }) => ({
  loading,
  isMobile: root.isMobile,
  settings,
}))(GroupList);
