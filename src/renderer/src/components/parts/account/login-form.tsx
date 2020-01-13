import React from 'react';
import { Form, Icon, Input, Button, Card } from 'antd';
// @ts-ignore
import styles from './login-form.less';
const FormItem = Form.Item;

interface Props {
  form?: any;
  onLoginSubmit: (values: object) => void;
  loading: boolean;
};

class LoginForm extends React.Component<Props> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onLoginSubmit(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card style={{ width: '100%', border: '1px solid #ddd' }} title="Account Login">
        <div className={styles.form}>
          <Form onSubmit={this.handleSubmit} className={styles.formInputs}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  autoFocus={true}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                  autoComplete="off"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Password"
                  type="password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                className={styles.btnGo}
                type="primary"
                htmlType="submit"
                loading={this.props.loading}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    );
  }
}

export default Form.create()(LoginForm);
