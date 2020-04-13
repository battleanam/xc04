import React, { useEffect } from 'react';

import { connect } from 'dva';
import { Modal, Steps } from 'antd';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';

const { Step } = Steps;

const DeviceWorkingLoading = (
  {
    status,
    statusIndex,
  },
) => {

  useEffect(() => {
    console.log(statusIndex);
  }, [statusIndex]);

  return (
    <Modal
      centered
      visible={status !== ''}
      footer={null}
      title={status}
    >
      <Steps current={4}>
        <Step
          title="开补光灯"
          icon={statusIndex < 1 ? <LoadingOutlined/> : <CheckOutlined/>}
        />
        <Step
          title="拍照"
          icon={statusIndex < 3 ? <LoadingOutlined/> : <CheckOutlined/>}
        />
        <Step
          title="上传"
          icon={statusIndex < 4 ? <LoadingOutlined/> : <CheckOutlined/>}
        />
        <Step
          title="完成"
          icon={statusIndex < 5 ? <LoadingOutlined/> : <CheckOutlined/>}
        />
      </Steps>
    </Modal>
  );
};

export default connect(
  (
    {
      device: {
        status,
        statusIndex,
      },
    },
  ) => (
    {
      status,
      statusIndex,
    }
  ),
)(DeviceWorkingLoading);
