import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';

import { Form, Input, message } from 'antd';
import { LoadingOutlined, LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';

import { login } from '@/pages/User/service';

import styles from './index.less';

class LoginLayout extends Component {

  loginForm = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      loading: false,
    };
    this.doLogin = this.doLogin.bind(this);
  }

  doLogin() {
    const { dispatch } = this.props;
    this.loginForm.current.validateFields().then(({ username, password }) => {
      this.setState({ loading: true, errorMsg: '' });
      login(username, password).then(({ Code, msg }) => {
        setTimeout(() => {
          if (Code === 1000) {
            this.setState({ loading: false });
            sessionStorage.setItem('username', username);
            dispatch({
              type: 'user/setUserInfo',
              payload: { username, realName: username },
            });
            router.replace('home');
            this.loginForm.current.resetFields();
          } else {
            this.setState({ loading: false, errorMsg: msg });
          }
        }, 500);
      });
    }).catch(() => {
      message.info('请补全表单信息！');
    });
  }

  render() {

    const { errorMsg, loading } = this.state;
    const [username, password] = ['', ''];

    return (
      <div className={styles.LoginLayout}>

        <div className={styles.formWrapper}>

          <div className={styles.title}>有害生物自动识别系统</div>

          <div className={styles.form}>
            <Form
              name={'loginForm'}
              ref={this.loginForm}
              initialValues={{ username, password }}
            >
              <Form.Item
                name={'username'}
                rules={[{ required: true, message: '请输入登录用户名' }]}
              >
                <Input
                  prefix={<UserOutlined/>}
                  placeholder={'请输入登录用户名'}
                />
              </Form.Item>
              <Form.Item
                name={'password'}
                rules={[{ required: true, message: '请输入登录密码' }]}
              >
                <Input.Password
                  prefix={<LockOutlined/>}
                  placeholder={'请输入登录密码'}
                />
              </Form.Item>
            </Form>

            {
              errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>
            }

          </div>

          <div className={styles.loginBtn}>
            <LoginOutlined title={'点击登录'} onClick={this.doLogin}/>
          </div>

        </div>
        {
          loading &&
          <div
            className={styles.spin}
          >
            <p>
              <LoadingOutlined style={{ fontSize: 24 }} spin/>
              <span>正在登录...</span>
            </p>
          </div>
        }

      </div>
    );
  }

}

export default connect()(LoginLayout);
