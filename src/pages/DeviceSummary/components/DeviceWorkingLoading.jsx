import React from 'react';

import { connect } from 'dva';
import { Modal, Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const DeviceWorkingLoading = (
  {
    status,
  },
) => {
  return (
    <Modal
      centered
      visible={status !== ''}
      footer={null}
      title={'照片拍摄中...'}
    >
      <Steps>
        <Step status="finish" title="Login" icon={<UserOutlined/>}/>
        <Step status="finish" title="Verification" icon={<SolutionOutlined/>}/>
        <Step status="process" title="Pay" icon={<LoadingOutlined/>}/>
        <Step status="wait" title="Done" icon={<SmileOutlined/>}/>
      </Steps>
    </Modal>
  );
};

export default connect(
  (
    {
      device: {
        status,
      },
    },
  ) => (
    {
      status,
    }
  ),
)(DeviceWorkingLoading);
