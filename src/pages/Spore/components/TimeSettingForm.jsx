import React from 'react';

import { Button, Col, Form, Row, Select } from 'antd';

import styles from './components.less';

const { Option } = Select;

const TimeSettingForm = () => {
  return (
    <div className={styles.TimeSettingForm}>
      <Form
        labelCol={{ span: 8 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={'启动时间'}
            >
              <Select>
                <Option value={111}>111</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'喷胶时间'}
            >
              <Select>
                <Option value={111}>111</Option>
              </Select>
            </Form.Item>
          </Col>

        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={'鼓风时间'}
            >
              <Select>
                <Option value={111}>111</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'手动时间'}
            >
              <Select>
                <Option value={111}>111</Option>
              </Select>
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={'下位机'}
            >
              <Button size={'small'} type={'primary'} block>读取R</Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={''}
            >
              <Button size={'small'} type={'primary'} block>保存S</Button>
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default TimeSettingForm;
