import React from 'react';

import { Button } from 'antd';
import {
  CameraOutlined,
  ArrowLeftOutlined,
  ArrowUpOutlined,
  ArrowRightOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import styles from './components.less';

const CameraControlForm = () => {
  return (
    <div className={styles.CameraControlForm}>
      <Button
        style={{ top: 0, left: 0, right: 0 }}
      >
        <ArrowUpOutlined/>
        上
      </Button>
      <Button
        style={{ top: 0, left: 0, bottom: 0 }}
      >
        <ArrowLeftOutlined/>
        前
      </Button>
      <Button
        style={{ top: 0, bottom: 0, right: 0 }}
      >
        <ArrowRightOutlined/>
        后
      </Button>
      <Button
        style={{ bottom: 0, left: 0, right: 0 }}
      >
        <ArrowDownOutlined/>
        下
      </Button>
      <Button
        type={'primary'}
        style={{ top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <CameraOutlined/>
        抓取上传
      </Button>
    </div>
  );
};

export default CameraControlForm;
