// @flow
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Row, Col, message, Card } from 'antd';
import LoginForm from '../../components/parts/account/login-form';
// @ts-ignore
import styles from './login.less';
import { T_DVA_Loading, Auth } from 'typings';

const { Content } = Layout;

interface Props {
  dispatch: (o: object) => void;
  loading: T_DVA_Loading;
  auth: Auth;
};

interface State {
  initLoading: boolean;
};

class Login extends React.Component<Props, State> {
  state = {
    initLoading: false,
  };

  tryLogin = (payload: Object) => {
    this.props.dispatch({
      type: 'users/login',
      payload,
      done: (err, auth: Auth) => {
        if (err) {
          message.warning('Login failed');
        } else {
          this.setState({ initLoading: true }, () => {
            this.initLogin(auth);
          });
        }
      },
    });
  };

  initLogin = (auth: Auth) => {
    this.props.dispatch({
      type: 'root/init',
      auth,
      done: err => {
        if (err) {
          message.warning('Could not preload data');
        }
        // this.setState({ initLoading: false });
      },
    });
  };

  componentDidUpdate() {
    let { auth } = this.props;
    if (auth) {
      message.success('Welcome ' + auth.user.username);
      this.props.dispatch(routerRedux.replace('/'));
      window.location.reload();
    }
  }

  render() {
    const { initLoading } = this.state;
    const { loading } = this.props;
    return (
      <Layout style={{ height: '100vh' }}>
        <Content>
          <Row>
            <Col md={2} lg={1} xs={24}>
              <div className={styles.loginLeft}>
                {/* <img style={{ height: 50, width: 65 }} src='../../assets/yay.jpg' /> */}
              </div>
            </Col>
            <Col md={22} lg={23} xs={24}>
              <div className={styles['login-right']}>
                {initLoading ? (
                  <Card>
                    <div>Loading...</div>
                  </Card>
                ) : (
                  <LoginForm
                    loading={loading.effects['users/login']}
                    onLoginSubmit={this.tryLogin}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default connect(({ root, loading }) => ({
  auth: root.auth,
  loading,
}))(Login);
