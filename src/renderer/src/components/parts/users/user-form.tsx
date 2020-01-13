import React from 'react';
import { Form, Input, Icon, Switch, Card } from 'antd';
import styles from './user-form.less';
import Selector from '../../form/selector';
import { Loading } from 'typings';
import classNames from "classnames";
import { User, Group } from '@/models/models';
import { string } from 'prop-types';

const statusProps = {
  checkedChildren: "Active",
  unCheckedChildren: "Disabled"
};

type Props = {
  loading: Loading;
  form: any;
  item: User;
  noPass:boolean;
  profileMode: boolean;
  groups: Group[];
  onSubmit: (x: User) => void;
  onChange?: <T,U>(key:string,value:T) => void;
  onRef: (x: UserForm) => void;
};

type State = {
  valid: boolean;
  itemStatus: boolean;
  confirmDirty:boolean;
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

class UserForm extends React.Component<Props, State> {
  state = {
    valid: false,
    confirmDirty: false,
    itemStatus:true
  };

  static getDerivedStateFromProps(props:Props, state:State) {
    const {item}=props;
    let ret:any={itemStatus:true} 
    if(item){
      ret.itemStatus=item.status==1
    }
    return ret;
  }

  componentDidMount = () => {
    this.props.onRef(this);
    this.props.onChange<number,User>("status",this.state.itemStatus? 1 : 0)// set the initial status
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Passwords do not match");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = () => {
    let { valid,itemStatus }:State = this.state;
    const { form, onSubmit, item } = this.props;

    setTimeout(() => {
      form.validateFields((error, values: typeof item) => {
        if (!error ) {
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
  handleGroupsChange=(v)=>this.props.onChange<string,string[]>("groups",v)

  handleStatusChange = (status: boolean) => {
    this.setState({ itemStatus: status }, () => {
      this.props.onChange<number,User>("status", status ? 1 : 0);
    });
  };

  handleChange:React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>=(evt:React.FormEvent<HTMLInputElement|HTMLTextAreaElement>):void=>{
    evt.stopPropagation();
    evt.preventDefault();
    if(this.props.onChange) this.props.onChange(evt.currentTarget.id,evt.currentTarget.value)
  }

  render() {
    const { form:{getFieldDecorator}, loading,item,noPass,groups,profileMode=false } = this.props;
    
    return (
      <div className={styles.formWr}>
        <Form className={styles.form} layout="horizontal" onSubmit={this.handleSave}>
          <Card
            bordered={false}
            // loading={loading.effects["users/save"]}
          >
            <Form.Item style={{ marginBottom: 0, height: 1 }}>
              {getFieldDecorator("_id", {})(<Input type="hidden" />)}
            </Form.Item>
            <Form.Item label="Username" {...fiL}>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Username name is required"
                  },
                  {
                    pattern: /^[A-z\s\-\0-9_']{1,150}$/,
                    message: "alphanumeric, space, dash only"
                  }
                ]
              })(
                <Input placeholder="Username for login" onChange={this.handleChange} />
              )}
            </Form.Item>
            {!noPass && [
              <Form.Item key="pass" label={"Password "} {...fiL}>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Password is required"
                    },
                    {
                      pattern: /(?=.{8,})/,
                      message: "at least 8 characters",
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input placeholder="Password" onChange={this.handleChange} />)}
              </Form.Item>,

              <Form.Item key="conf" label={"Confirm"} {...fiL}>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Password is required"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input
                    placeholder="Confirm Password"
                    onBlur={this.handleConfirmBlur}
                    onChange={this.handleChange}
                  />
                )}
              </Form.Item>
            ]}
            <Form.Item label={fiL ? "Access Groups" : undefined} {...fiL}>
              {getFieldDecorator("groups", {
                rules: [
                  {
                    required: true,
                    message: " required"
                  },
                ]
              })(
                <Selector
                  enableSearch={true}
                  items={groups}
                  onChange={this.handleGroupsChange}
                  mode="tags"
                  placeholder="select groups"
                  disabled={profileMode}
                  notFoundContent={loading.effects["groups/fetch"] ? <Icon type="loader" /> : null}
                />
              )}
            </Form.Item>
            <Form.Item label="Name" {...fiL}>
              {getFieldDecorator("fullName", {
                rules: [
                  {
                    required: false,
                    message: "Name is required"
                  },
                  {
                    pattern: /^[A-z\-\s]{0,}$/,
                    message: "Invalid name"
                  }
                ]
              })(<Input placeholder="Full name" onChange={this.handleChange} />)}
            </Form.Item>
            <Form.Item label="Phone Number" {...fiL}>
              {getFieldDecorator("phoneNumber", {
                rules: [
                  {
                    pattern: /^[+0-9']{0,50}$/,
                    message: "Invalid chars"
                  }
                ]
              })(
                <Input placeholder="Contact phone number" onChange={this.handleChange} />
              )}
            </Form.Item>
            <Form.Item label={"Email"} {...fiL}>
              {getFieldDecorator("email", {
                rules: [
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email"
                  }
                ]
              })(<Input placeholder="Email address" onChange={this.handleChange} />)}
            </Form.Item>
            {!profileMode &&
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
            }
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
})(UserForm);
