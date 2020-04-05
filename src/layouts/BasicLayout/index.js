import React, { Component } from 'react';
import { connect } from 'dva';
import cn from 'classnames';

import { Button, Select, ConfigProvider, Layout, message, Menu, Avatar, Dropdown } from 'antd';
import XRangePicker from '@/layouts/BasicLayout/components/XRangePicker';
import Logo from '@/layouts/BasicLayout/components/Logo';

import styles from './index.less';
import util from '@/styles/util.less';

import zhCN from 'antd/es/locale/zh_CN';
import { UserOutlined, LineChartOutlined, LogoutOutlined, ToolOutlined } from '@ant-design/icons';
import router from 'umi/router';

const { Header, Content } = Layout;
const { Option } = Select;

class BasicLayout extends Component {


  constructor(props) {
    super(props);
    this.onUnitChange = this.onUnitChange.bind(this);
  }

  onUnitChange(e) {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/setDateUnit',
      payload: e,
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    message.success('登录成功！');
    const username = sessionStorage.getItem('username');
    if (username) {
      dispatch({
        type: 'user/setUserInfo',
        payload: { username, realName: username },
      });
    }
  }

  render() {

    const { dateUnit, dateRange, dispatch, children, deviceId, realName } = this.props;

    return (
      <ConfigProvider locale={zhCN}>
        <Layout className={styles.BasicLayout}>
          <Header className={cn(styles.header, util.clearFix)}>
            <Logo style={{ marginRight: 24 }}/>

            <span>请选择测报灯设备：</span>
            <Select
              value={deviceId}
              style={{
                minWidth: 64,
                marginRight: 0,
                marginLeft: -12,
              }}
              bordered={false}
              onChange={value => {
                dispatch({
                  type: 'home/setDeviceId',
                  payload: value,
                });
              }}
            >
              <Option value="69010601">测报灯1</Option>
              <Option value="60031322">测报灯2</Option>
              <Option value="17102704">测报灯3</Option>
              <Option value="17102603">测报灯4</Option>
            </Select>

            <XRangePicker
              unit={dateUnit}
              unitChange={this.onUnitChange}
              value={dateRange}
              onChange={e => dispatch({
                type: 'home/setDateRange',
                payload: e,
              })}
            />
            <Button
              size={'small'}
              type={'primary'}
              onClick={() => {
                dispatch({
                  type: 'home/getPicList',
                  sDate: dateRange[0],
                  eDate: dateRange[1],
                  userName: deviceId,
                });
              }}
            >查询</Button>

            <div className={styles.funBtn}>
              <Dropdown overlay={
                <Menu>
                  <Menu.Item>
                    <ToolOutlined/>
                    管理害虫种类
                  </Menu.Item>
                  <Menu.Divider/>
                  <Menu.Item onClick={() => {
                    sessionStorage.clear()
                    router.replace('/');
                  }}>
                    <LogoutOutlined/>
                    退出登录
                  </Menu.Item>
                </Menu>
              }
                        placement={'bottomCenter'}
              >
                <div>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined/>}/>
                  <span style={{ marginLeft: 8 }}>{realName}</span>
                </div>
              </Dropdown>
            </div>

            <div className={styles.funBtn}>
              <LineChartOutlined/>
              数据统计
            </div>

          </Header>
          <Content className={cn(styles.content)}>
            {children}
          </Content>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default connect(({ home, user }) => ({ ...home, ...user }))(BasicLayout);


