import React from 'react';
import { Form, Input, Icon, Switch, Card } from 'antd';
import styles from './group-form.less';
import Selector from '../../form/selector';
import { Loading } from 'typings';
import classNames from "classnames";
import AuthoritiesForm from './authorities-form';
import { Group } from '@/models/models';
import { authList } from '@/common/authorities';
import { number } from 'prop-types';

const statusProps = {
  checkedChildren: "Active",
  unCheckedChildren: "Disabled"
};

type Props = {
  loading: Loading;
  form: any;
  item: Group;
  onSubmit: (x: Group) => void;
  onChange?: <T,U>(key:string,value:T) => void;
  onRef: (x: GroupForm) => void;
};

type State = {
  valid: boolean;
  selected_auths:string[];
  itemStatus: boolean;
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

class GroupForm extends React.Component<Props, State> {
  state = {
    valid: false,
    selected_auths:[],
    itemStatus:true
  };

  static getDerivedStateFromProps(props:Props, state:State) {
    const {item}=props;
    let ret:any={itemStatus:true} 
    if(item){
      if(state.selected_auths.length===0) ret.selected_auths=item.authorities || [];
      ret.itemStatus=item.status==1
    }
    return ret;
  }

  componentDidMount = () => {
    this.props.onRef(this);
    this.props.onChange<number,Group>("status",this.state.itemStatus? 1 : 0)// set the initial status
  };

  handleSubmit = () => {
    let { valid,selected_auths,itemStatus }:State = this.state;
    const { form, onSubmit, item } = this.props;

    setTimeout(() => {
      valid = selected_auths.length > 0;
      form.validateFields((error, values: typeof item) => {
        if (!error && selected_auths.length > 0) {
          values.authorities = selected_auths;
          values.status = itemStatus ? 1 : 0;
          onSubmit(values);
        }
        this.setState({ valid });
      });
    });
  };

  handleSave = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    this.handleSubmit();
  };

  handleAuthsChange = (selected_auths:string[]) =>
    this.setState({
      selected_auths,
      valid: selected_auths.length > 0
    },()=>{
      if(this.props.onChange) this.props.onChange<string[],Group>("authorities",selected_auths)
      
    });

  handleStatusChange = (status: boolean) => {
    this.setState({ itemStatus: status }, () => {
      this.props.onChange<number,Group>("status", status ? 1 : 0);
    });
  };

  handleChange:React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>=(evt:React.FormEvent<HTMLInputElement|HTMLTextAreaElement>):void=>{
    evt.stopPropagation();
    evt.preventDefault();
    if(this.props.onChange) this.props.onChange(evt.currentTarget.id,evt.currentTarget.value)
  }

  render() {
    const { form:{getFieldDecorator}, loading,item } = this.props;
    
    return (
      <div className={styles.form}>
        <Form className={styles.formInputs} layout="horizontal" onSubmit={this.handleSave}>
        <Card
            bordered={false}
            loading={loading.effects["groups/save"]}
            className={styles.formInputsInner}
            bodyStyle={{ padding: 0, margin: 0 }}
        >
          <Form.Item className={classNames("mb-0")}>
            {getFieldDecorator("_id", {})(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item label="Group Name" {...fiL}>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "name is required"
                },
                {
                  pattern: /^[A-z\s\-\0-9_\(\)']{1,150}$/,
                  message: "alphanumeric, space, dash only"
                }
              ]
            })(
              <Input
                placeholder="Name of group"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Description" style={{ marginTop: "-5px" }}  {...fiL}>
            {getFieldDecorator("description", {
              rules: []
            })(
              <Input.TextArea rows={1} cols={30} placeholder="Description" onChange={this.handleChange} />
            )}
          </Form.Item>
          <Form.Item label={fiL ? "Status" : undefined} {...fiL}>
            {getFieldDecorator("status", { initialValue: true })(
              <Switch
                {...statusProps}
                defaultChecked={true}
                checked={this.state.itemStatus}
                onChange={this.handleStatusChange}
              />
            )}
          </Form.Item>
        </Card>
          <Card title={"Select authorities"}>
            {!this.state.valid && this.state.selected_auths.length===0 && (
              <p style={{ color: "red" }}>Select at least one</p>
            )}
            <AuthoritiesForm
              defaultChecked={(item && item.authorities) || []}
              authorities={authList}
              loading={loading.effects["groups/get"]}
              onSubmit={this.handleAuthsChange}
              checkable={true}
            />
          </Card>
          </Form>
      </div>
    );
  }
}
export default Form.create({
  mapPropsToFields(props: Props) {
    let r = {},
      d = props.item;
    if (d) {
      Object.keys(d).map(key => {
        return (r[key] = Form.createFormField({
          value: d[key],
        }));
      });
    }
    return r;
  },
})(GroupForm);
