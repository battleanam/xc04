import React from 'react';
import { connect } from 'dva';
import { Card, Layout, List } from 'antd';
import { map } from 'lodash';
import moment from 'moment';

import styles from './index.less';
import SporePicList from '@/pages/Spore/components/SporePicList';
import TimeSettingForm from '@/pages/Spore/components/TimeSettingForm';
import CameraControlForm from '@/pages/Spore/components/CameraControlForm';
import StatusWrapper from '@/pages/Spore/components/StatusWrapper';

const { Header } = Layout;

const Spore = (
  {
    clientWidth,
    clientHeight,
    logs,
    sporeId, // 设备ID
    picList, // 设备图像列表
    currentPic, // 当前图片
    startUpTime, // 启动时间
    glueSprayingTime, // 喷胶时间
    adsorbTime, // 鼓风时间 开始吸附孢子的时间
    speed, // 摄像头移动速度
    status, // 设备状态
    workInterval,
  },
) => {

  const secondRowHeight = 220;
  const firstRowHeight = clientHeight - 64 - secondRowHeight;

  return (
    <Layout className={styles.Spore}>

      <Header className={styles.sporeHeader}>
        <h1>XC Spore - {sporeId}</h1>
      </Header>

      <div
        className={styles.firstRow}
        style={{
          height: firstRowHeight,
        }}>

        <Card
          hoverable
          title={'运行日志'}
          size={'small'}
          className={styles.logsWrapper}
          style={{ padding: 0 }}
        >
          {
            map(logs, log => (<p>{log}</p>))
          }
        </Card>

        <Card
          hoverable
          title={'孢子图像'}
          size={'small'}
          className={styles.picsWrapper}
          bodyStyle={{
            overflow: 'auto',
            height: 'calc(100% - 48px)',
          }}
        >
          <SporePicList/>
        </Card>

      </div>
      <div
        className={styles.secondRow}
        style={{ height: secondRowHeight }}
      >
        <Card
          hoverable
          size={'small'}
          title={'实时视频'}
          className={styles.video}
          bodyStyle={{
            display: 'flex',
            height: 158,
          }}
        >
          <div style={{
            backgroundColor: 'rgba(0,0,0,.4)',
            height: '100%',
            width: '100%',
          }}>
          </div>
        </Card>

        <Card
          hoverable
          size={'small'}
          title={'时间设置区：单位(H/M/S)'}
          className={styles.timeSettings}
        >
          <TimeSettingForm/>
        </Card>
        <Card
          hoverable
          size={'small'}
          title={'摄像头控制功能区'}
          className={styles.cameraControl}
          bodyStyle={{ height: 156 }}
        >
          <CameraControlForm/>

        </Card>
        <Card
          hoverable
          size={'small'}
          title={'设备状态'}
          className={styles.statusWrapper}
          bodyStyle={{ height: 156 }}
        >
          <StatusWrapper/>
        </Card>
      </div>
    </Layout>
  );
};

export default connect((
  {
    browser: {
      clientWidth,
      clientHeight,
    },
    spore: {
      logs,
      sporeId, // 设备ID
      picList, // 设备图像列表
      currentPic, // 当前图片
      startUpTime, // 启动时间
      glueSprayingTime, // 喷胶时间
      adsorbTime, // 鼓风时间 开始吸附孢子的时间
      speed, // 摄像头移动速度
      status, // 设备状态
      workInterval,
    },
  },
) => (
  {
    clientWidth,
    clientHeight,
    logs,
    sporeId, // 设备ID
    picList, // 设备图像列表
    currentPic, // 当前图片
    startUpTime, // 启动时间
    glueSprayingTime, // 喷胶时间
    adsorbTime, // 鼓风时间 开始吸附孢子的时间
    speed, // 摄像头移动速度
    status, // 设备状态
    workInterval,
  }
))(Spore);
