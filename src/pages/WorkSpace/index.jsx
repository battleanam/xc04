import React from 'react';
import cn from 'classnames';
import { connect } from 'dva';

import { Button, Modal } from 'antd';
import StandardPhoto from '@/pages/WorkSpace/components/StandardPhoto';
import PreViewer from '@/pages/WorkSpace/components/PreViewer';

import styles from './index.less';
import util from '@/styles/util.less';
import KonvaEngine from '@/pages/WorkSpace/components/KonvaEngine';

const Workspace = (
  {
    visible,
    src,
    deviceId,
    name,
    dispatch,
  },
) => {

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
      onCancel={() => {

        dispatch({
          type: 'workspace/setVisible',
          payload: false,
        });
        dispatch({
          type: 'workspace/setCurrentShape',
          payload: -1,
        });
        dispatch({
          type: 'workspace/setShapes',
          payload: [],
        });
        dispatch({
          type: 'previewer/setDrawing',
          payload: false,
        });
        dispatch({
          type: 'previewer/setMovingPoint',
          payload: [],
        });
      }}
    >
      <div className={styles.widgetWrapper}>
        <div className={styles.labelWrapper} style={{ width: picWidth + 'px' }}>
          <KonvaEngine src={src} height={713} width={picWidth}/>
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
            picWidth={picWidth}
            picHeight={713}
            stageWidth={1366 - picWidth - 30}
            stageHeight={1366 - picWidth - 30}
            src={src}
          />
        </div>
      </div>
    </Modal>
  );
};

export default connect(
  (
    {
      workspace: {
        visible,
        src,
        deviceId,
        name,
      },
    },
  ) => (
    {
      visible,
      src,
      deviceId,
      name,
    }
  ),
)(Workspace);
