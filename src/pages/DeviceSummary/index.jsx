import React from 'react';
import { connect } from 'dva';
import { map, concat, upperFirst } from 'lodash';
import router from 'umi/router';

import { Badge, Button, Descriptions, Switch } from 'antd';

import styles from './index.less';
import DeviceWorkingLoading from '@/pages/DeviceSummary/components/DeviceWorkingLoading';
import Analysis from '@/pages/Analysis';

const cbd = require('@/assets/device/cbd.png');

const options1 = ['已关闭', '已打开'];
const options2 = ['故障', '正常'];

const widgetList = [
  {
    key: 'insectLamp',
    label: '诱虫灯',
    options: options1,
  },
  {
    key: 'LED',
    label: '补光灯',
    options: options1,
  },
  {
    key: 'heating_1',
    label: '加热1',
    options: options1,
  },
  {
    key: 'heating_2',
    label: '加热2',
    options: options1,
  },
];

const modelList = [
  {
    key: 'board',
    label: '翻版',
    options: options2,
  },
  {
    key: 'rain',
    label: '接雨',
    options: options2,
  },
  {
    key: 'insectClean',
    label: '清虫',
    options: options2,
  },
  {
    key: 'disc',
    label: '圆盘',
    options: options2,
  },
];

const statusList = concat(
  widgetList.map(widget => ({ ...widget, type: 'widget' })),
  modelList.map(model => ({ ...model, type: 'model' })),
);

const DeviceSummary = (props) => {

  const {
    clientHeight,
    clientWidth,
    deviceId,
    online,
    dispatch,
  } = props;

  const chartHeight = clientHeight - 128 - 164 - 32 - 96;
  const chartWidth = clientWidth - chartHeight * 340 / 804 - 256;

  return (
    <div className={styles.DeviceSummary}>
      <div className={styles.cdbPhoto}>
        <img src={cbd} height={clientHeight - 128} alt={''}/>
      </div>
      <div className={styles.workspace}>
        <div className={styles.statusPanel}>
          <Descriptions
            title={'设备运行状态'}
            column={4}
          >
            <Descriptions.Item
              label={'测报灯编号'}
              span={2}
            >
              {deviceId}
            </Descriptions.Item>
            <Descriptions.Item
              label={'在线情况'}
              span={2}
            >
              <Badge
                color={'green'}
                status={online === 1 ? 'processing' : 'default'}
                text={online === 1 ? '在线' : '离线'}
              />
            </Descriptions.Item>
            {
              map(statusList, ({ key, label, options, type }) => (
                <Descriptions.Item
                  label={label}
                  key={key}
                >
                  {
                    type === 'widget' ?
                      <Switch
                        checked={props[key] === 1}
                        checkedChildren={options[1]}
                        unCheckedChildren={options[0]}
                        onChange={(checked) => {
                          dispatch({
                            type: `device/set${upperFirst(key)}`,
                            payload: +checked,
                          });
                        }}
                      />
                      :
                      <>
                        <Badge
                          color={props[key] === 0 ? 'red' : '#52c41a'}
                        />
                        {options[props[key]]}
                      </>
                  }
                </Descriptions.Item>
              ))
            }
          </Descriptions>
        </div>

        <div className={styles.analysis}>
          <Button
            type={'primary'}
            onClick={() => {
              dispatch({
                type: 'device/takePhoto',
              });
            }}
            style={{
              marginRight: 12,
            }}
          >拍摄</Button>

          <Button
            type={'primary'}
            onClick={() => {
              router.push('/home');
            }}
          >查看图片列表</Button>

        </div>

        <Analysis
          height={chartHeight}
          width={chartWidth}
        />

      </div>
      <DeviceWorkingLoading/>
    </div>
  );

};

export default connect(
  (
    {
      browser: {
        clientHeight,
        clientWidth,
      },
      device: {
        deviceId,
        online,
        light,
        heating,
        status,
        insectLamp,
        LED,
        heating_1,
        heating_2,
        board,
        rain,
        insectClean,
        disc,
      },
    },
  ) => (
    {
      clientHeight,
      clientWidth,
      deviceId,
      online,
      light,
      heating,
      status,
      insectLamp,
      LED,
      heating_1,
      heating_2,
      board,
      rain,
      insectClean,
      disc,
    }
  ),
)(DeviceSummary);
