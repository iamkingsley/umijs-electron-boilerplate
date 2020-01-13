import React from 'react';
import { Icon } from 'antd';
import styles from "@/global.less"

export interface Column {
  key: string;
  canHide: boolean;
  //   name: string;
  title: string;
  active?: boolean;
  dataIndex: string;
  checked?: boolean;
  render?: (x: any, y: any) => any;
  sort?: (x: any, y: any) => any;
}

export interface ViewListProps {
  //   colData: Array<Column | string>;
  columns: string[];
  active: string[];
  canRowClick: boolean;
}
export interface ViewListState {
  activeCols: Array<string>;
  popColumns: Column[];
  visiblePopColumnForm: boolean;
  isRowClickable:boolean;
}

class ViewList<P extends ViewListProps, S extends ViewListState> extends React.Component<P, S> {
  getColumns: () => Column[];
  handleClick: (x: any) => void;

  componentDidMount = () => {
    const { columns, active } = this.props;
    let { activeCols, popColumns } = this.state;
    if (active) activeCols = active;
    popColumns = this.getColumns().concat(this.getActionColumn());
    if (columns) {
      popColumns = popColumns.filter(x => x.canHide == false || columns.includes(x.key));
    }
    popColumns = popColumns.map(c => {
      c.checked = activeCols.includes(c.key);
      return c;
    });

    this.setState({ activeCols, popColumns,isRowClickable: this.canRowClick()});
  };
  handleActiveColsChange = cols => {
    this.setState({ activeCols:cols, visiblePopColumnForm: false });
  };
  handlePopVisibilityChange = visible => {
    this.setState({ visiblePopColumnForm: visible });
  };
  canRowClick=():boolean=>{
    return /* !!this.state.activeCols.includes("action") && */ this.props.canRowClick
  }

  //see <Table
  handleTableRowClick = c => ({
    onClick: () => this.handleClick(c),
  });
  //see <Table
  setRowKey = item => item._id;

  getActionColumn = (checked = true): Column => {
    return {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      canHide: true,
      checked: checked,
      render: (text, record) => (
        // @ts-ignore
        <div className="tableActionBtn" onClick={()=>this.handleClick(record)} >
          {/* <Icon type="eye" />  */}
          View
        </div>
      ),
    };
  };
}
export default ViewList;
