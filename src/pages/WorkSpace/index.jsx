import React from 'react';
import cn from 'classnames';

import { Modal } from 'antd';

import styles from './index.less';
import util from '@/styles/util.less';

const Workspace = ({ visible, shapes, close }) => {

  const { clientHeight } = document.body;

  return (
    <Modal
      title={'Working Box'}
      visible={visible}
      className={styles.Workspace}
      style={{ top: clientHeight > 768 ? (clientHeight - 768) / 2 : 0 }}
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
      <div className={cn(util.customScrollBar, styles.widgetWrapper)}>
        <div className={styles.labelWrapper}>

        </div>
        <div>

        </div>
      </div>
    </Modal>
  );
};

export default Workspace;
