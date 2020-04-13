import React from 'react';

import { Button, Form, Row, Select } from 'antd';

import styles from './components.less';

const { Option } = Select;

const StatusWrapper = () => {
  return (
    <div className={styles.StatusWrapper}>
      <Form>
        <Form.Item
          label={'状态'}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <div
              className={styles.point}
              style={{
                backgroundColor: '#73d13d',
              }}
            />
            <div
              style={{
                flex: 1,
                padding: '0 24px',
                maxWidth: 144
              }}
            >
              <Button
                type={'danger'}
                block
              >停止</Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StatusWrapper;
