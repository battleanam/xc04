import React from 'react';
import cn from 'classnames';
import { Button, Modal } from 'antd';

import styles from './index.less';
import util from '@/styles/util.less';
import StandardPhoto from '@/pages/WorkSpace/components/StandardPhoto';
import PreViewer from '@/pages/WorkSpace/components/PreViewer';

const Workspace = ({ visible, src, filename, deviceId, name, close }) => {

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
      maskClosable={false}
      onCancel={close}
    >
      <div className={styles.widgetWrapper}>
        <div className={styles.labelWrapper} style={{ width: picWidth + 'px' }}>
          <img style={{ width: picWidth + 'px' }} src={src} alt={filename}/>
        </div>
        <div
          className={cn(styles.operates, util.customScrollBar)}
          style={{ width: 1366 - picWidth + 'px' }}
        >
          <Button type={'primary'} className={styles.saveBtn}>保存修改</Button>
          <h4>测报灯编号: {deviceId}</h4>
          <h4>拍摄时间: {name}</h4>
          <StandardPhoto/>
          <PreViewer
            wrapperStyle={{ height: 1366 - 24 - picWidth + 'px' }}
            src={src}
          />
          <p className={styles.message}>向下滑动查看统计信息</p>
        </div>
      </div>
    </Modal>
  );
};

export default Workspace;
