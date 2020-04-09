import React, { Component } from 'react';
import { connect } from 'dva';

import { Form, Input, message } from 'antd';
import { LoadingOutlined, LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';


import styles from './index.less';

class LoginLayout extends Component {

  loginForm = React.createRef();

  constructor(props) {
    super(props);
    this.doLogin = this.doLogin.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
  }

  componentDidMount() {
    this.loginForm.current.resetFields();
  }

  doLogin() {
    const { dispatch } = this.props;
    this.loginForm.current.validateFields().then(({ username, password }) => {
      dispatch({
        type: 'user/setLoading',
        payload: true
      });
      setTimeout(() => {
        dispatch({
          type: 'user/login',
          payload: { username, password },
        });
      }, 500);
    }).catch(() => {
      message.info('请补全表单信息！');
    });
  }

  onKeyup(e) {
    if (e.keyCode === 13) {
      this.doLogin();
    }
  }

  render() {

    const { errorMsg, loading, dispatch } = this.props;
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
              onValuesChange={value => {
                dispatch({ type: 'user/setUserInfo', payload: value });
              }}
            >
              <Form.Item
                name={'username'}
                rules={[{ required: true, message: '请输入登录用户名' }]}
              >
                <Input
                  prefix={<UserOutlined/>}
                  placeholder={'请输入登录用户名'}
                  onKeyUp={this.onKeyup}
                />
              </Form.Item>
              <Form.Item
                name={'password'}
                rules={[{ required: true, message: '请输入登录密码' }]}
              >
                <Input.Password
                  prefix={<LockOutlined/>}
                  placeholder={'请输入登录密码'}
                  onKeyUp={this.onKeyup}
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

export default connect(({ user }) => ({ ...user }))(LoginLayout);
