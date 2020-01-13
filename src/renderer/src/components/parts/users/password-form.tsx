import React from 'react';
import { Form, Input, Icon, Switch, Card } from 'antd';
import styles from './user-form.less';
import { User, UserPwdObj } from '@/models/models';

type Props = {
  form: any;
  item: User;
  onSubmit: (x: UserPwdObj) => void;
  onRef: (x: UserForm) => void;
};

type State = {
  valid: boolean;
  itemStatus: boolean;
  confirmDirty: boolean;
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
    itemStatus: true,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { item } = props;
    let ret: any = { itemStatus: true };
    if (item) {
      ret.itemStatus = item.status == 1;
    }
    return ret;
  }

  componentDidMount = () => {
    this.props.onRef(this);
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = () => {
    let { valid }: State = this.state;
    const { form, onSubmit, item } = this.props;

    setTimeout(() => {
      form.validateFields((error, values: UserPwdObj) => {
        if (!error) {
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

  render() {
    const {
      form: { getFieldDecorator },
      item,
    } = this.props;

    return (
      <div className={styles.form}>
        <Form className={styles.formInputs} layout="horizontal" onSubmit={this.handleSave}>
          <Card
            bordered={false}
            // loading={loading.effects["users/save"]}
            className={styles.formInputsInner}
          >
            <Form.Item style={{ marginBottom: 0, height: 1 }}>
              {getFieldDecorator('_id', {})(<Input type="hidden" />)}
            </Form.Item>
            <Form.Item key="pass" label={'Password '} {...fiL}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Password is required',
                  },
                  {
                    pattern: /(?=.{8,})/,
                    message: 'at least 8 characters',
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input placeholder="Password" />)}
            </Form.Item>

            <Form.Item key="conf" label={'Confirm'} {...fiL}>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Password is required',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input
                  placeholder="Confirm Password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>
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
