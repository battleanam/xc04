import React from 'react';
import cn from 'classnames';

import { Modal } from 'antd';

import styles from './index.less';
import util from '@/styles/util.less';
import StandardPhoto from '@/pages/WorkSpace/components/StandardPhoto';

const Workspace = ({ visible, src, filename, deviceId, name, shapes, close }) => {

  const picWidth = Math.ceil(3264 / 2448 * 713);

  return (
    <Modal
      centered
      title={'Information'}
      visible={visible}
      className={styles.Workspace}
      width={'1366px'}
      bodyStyle={{
        padding: 0,
        height: 768 - 55,
        position: 'relative',
      }}
      wrapClassName={'noPadding'}
      footer={null}
      onCancel={close}
    >
      <div className={styles.widgetWrapper}>
        <div className={styles.labelWrapper} style={{ width: picWidth + 'px' }}>
          <img style={{ width: picWidth + 'px' }} src={src} alt={filename}/>
        </div>
        <div className={cn(styles.operates, util.customScrollBar)} style={{ width: 1366 - picWidth + 'px' }}>
          <h4>测报灯编号: {deviceId}</h4>
          <h4>拍摄时间: {name}</h4>
          <StandardPhoto/>
        </div>
      </div>
    </Modal>
  );
};

export default Workspace;
