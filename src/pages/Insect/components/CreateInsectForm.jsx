import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import ColorPicker from '@/components/ColorPicker/ColorPicker';

const CreateInsectForm = ({ visible, type, current, insectSaveLoading, dispatch }) => {

  const defaultValue = {
    bugName: '',
    color: '#FF0000',
    weight: 1,
  };

  const [formValue, setFormValue] = useState(type === '添加' ? defaultValue : { ...current });

  const [insectForm] = Form.useForm();

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    if (type === '编辑') {
      setFormValue(current);
      insectForm.setFieldsValue(current);
    }
  }, [current, insectForm, type]);

  const handleOk = () => {
    insectForm.validateFields().then((value) => {

      if (type === '添加') {
        dispatch({
          type: 'insect/addInsectType',
          payload: value,
          callback: () => {
            insectForm.setFieldsValue(defaultValue);
            setFormValue(defaultValue);
          },
        });
      } else {
        dispatch({
          type: 'insect/updateInsectType',
          payload: {
            ...current,
            ...value,
          },
          callback: () => {
            insectForm.setFieldsValue(defaultValue);
            setFormValue(defaultValue);
          },
        });
      }

    }).catch(() => {
      message.info('请补全表单信息');
    });
  };

  const handleCancel = () => {
    dispatch({
      type: 'insect/setModalVisible',
      payload: false,
    });
    setTimeout(() => {
      insectForm.setFieldsValue(defaultValue);
      setFormValue(defaultValue);
    }, 200);
  };

  return (
    <Modal
      visible={visible}
      title={`${type}害虫种类`}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={insectSaveLoading}
    >
      <Form
        {...layout}
        name={'insectForm'}
        form={insectForm}
        initialValues={formValue}
        onValuesChange={(e) => {
          setFormValue({ ...formValue, ...e });
        }}
      >
        <Form.Item
          label={'害虫名称'}
          name={'bugName'}
          rules={[
            { required: true, message: '请输入害虫名称' },
          ]}
        >
          <Input placeholder={'请输入害虫名称'}/>
        </Form.Item>
        <Form.Item label={'线条预览'}>
          <div style={{
            width: '48px',
            height: '24px',
            border: `${formValue.weight}px solid ${formValue.color}`,
          }}/>
        </Form.Item>
        <Form.Item
          label={'线条颜色'}
          name={'color'}
          rules={[
            { required: true, message: '请输入线条颜色' },
          ]}
        >
          <ColorPicker/>
        </Form.Item>
        <Form.Item
          label={'线条宽度'}
          name={'weight'}
          rules={[
            { required: true, message: '请输入线条宽度' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} min={1} max={4} placeholder={'请输入线条宽度'}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateInsectForm;
