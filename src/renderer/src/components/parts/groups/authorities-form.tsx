import React from 'react';
import { Form, Input, Icon, Tree, Card } from 'antd';
import styles from './group-form.less';
import { Loading } from 'typings';
import { Authority } from '@/models/models';
const TreeNode = Tree.TreeNode;

type Props = {
  authorities: Authority[];
  onSubmit?: (x: Object) => void;
  onRef?: (x: AuthoritiesForm) => void;
  defaultChecked?: Array<string>;
  loading?: Loading;
  checkable?: boolean;
  selectable?: boolean;
  disabled?: boolean;
};

type State = {
  checkedTree: Array<string>;
  selectedTreeItem: Array<string>;
};

//set to undefined for addonBefore view
const fiL = {
  //formItemLayout
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 20 },
  },
};

class AuthoritiesForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTreeItem: [],
      checkedTree: props.defaultChecked,
    };
  }

  componentDidMount = () => {
    this.props.onRef && this.props.onRef(this);
  };

  handleSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.checkedTree);
  };

  handleTreeChange = (checkedTree: Array<string>) =>
    !this.props.disabled &&
    this.setState(
      {
        checkedTree,
      },
      () => this.handleSubmit()
    );

  handleTreeSelect = (selectedTreeItem: Array<string>) =>
    !this.props.disabled &&
    this.setState({
      selectedTreeItem,
    });

  render() {
    const { authorities, defaultChecked, checkable, selectable, disabled } = this.props;
    const { checkedTree } = this.state;
    let checked = checkable && (checkedTree.length > 0 ? checkedTree : defaultChecked);

    return (
      <Tree
        style={{ width: 400 }}
        defaultSelectedKeys={selectable && defaultChecked}
        defaultCheckedKeys={checkable && defaultChecked}
        selectedKeys={selectable && checked}
        dropdownStyle={{ maxHeight: 400 }}
        placeholder="Select some"
        checkedKeys={checked}
        selectable={selectable}
        checkable={checkable}
        disabled={disabled && !!this.props.onSubmit}
        // showIcon={false}
        showLine={true}
        showSearch={true}
        defaultExpandAll={true}
        onCheck={this.handleTreeChange}
        onSelect={this.handleTreeSelect}
      >
        <TreeNode title={'All'} value="all" key="all">
          {authorities.map(a => (
            <TreeNode title={a.name} key={a._id} value={a._id}>
              {a.children.map(c => (
                <TreeNode title={c.name} key={c._id} value={c._id} />
              ))}
            </TreeNode>
          ))}
        </TreeNode>
      </Tree>
    );
  }
}
export default AuthoritiesForm;
