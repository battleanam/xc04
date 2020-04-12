import React, { Component } from 'react';
import { connect } from 'dva';

import { Button, Card, List, Popconfirm } from 'antd';

import { insectUrlMapping } from '@/constants/insects';

import styles from './index.less';
import FixHeightImg from '@/components/FixHeightImg';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import CreateInsectForm from '@/pages/Insect/components/CreateInsectForm';

class Insect extends Component {

  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch({
      type: 'insect/getInsectTypes',
    });

    this.state = {
      modalType: '添加',
      currentInsect: null,
    };
  }

  render() {

    const { insectTypes, modalVisible, dispatch } = this.props;
    const { modalType, currentInsect } = this.state;

    return (
      <div className={styles.Insect}>
        <List
          dataSource={[{}, ...insectTypes]}
          rowKey={'keyid'}
          grid={{
            gutter: 16,
            xxl: 6,
            xl: 4,
            lg: 3,
            sm: 2,
            xs: 1,
          }}
          renderItem={(item) => {
            const { bugName, color, weight } = item;
            if (!bugName) {
              return (
                <List.Item>
                  <Button
                    type="dashed"
                    className={styles.newButton}
                    onClick={() => {
                      this.setState({ modalType: '添加' });
                      dispatch({
                        type: 'insect/setModalVisible',
                        payload: true,
                      });
                    }}
                  >
                    <PlusOutlined/> 新增害虫种类
                  </Button>
                </List.Item>
              );
            }

            const urls = insectUrlMapping[bugName];

            return (
              <List.Item>
                <Card
                  hoverable
                  actions={
                    [
                      <EditOutlined
                        onClick={() => {
                          this.setState({
                            modalType: '编辑',
                            currentInsect: { ...item },
                          });
                          dispatch({
                            type: 'insect/setModalVisible',
                            payload: true,
                          });
                        }}
                      />,
                      <Popconfirm
                        title={'确认删除这个害虫种类吗？'}
                        okText={'删除'}
                        okType={'danger'}
                        onConfirm={() => {
                          dispatch({
                            type: 'insect/removeInsectType',
                            payload: item,
                          });
                        }}
                      >
                        <CloseOutlined className={styles.danger}/>
                      </Popconfirm>,
                    ]
                  }
                  bodyStyle={{
                    padding: '4px 12px',
                    height: 171,
                  }}
                >
                  <div
                    className={styles.insectBox}
                    style={{
                      borderColor: color,
                      borderWidth: weight + 'px',
                      color,
                    }}
                  >
                    {bugName}
                  </div>
                  <div style={{ padding: 4 }}>
                    <FixHeightImg
                      className={styles.insectPic}
                      src={urls ? urls[0] : ''}
                      height={120}
                      noData={
                        <>
                          暂无
                          <span
                            style={{
                              color,
                              margin: '0 4px',
                            }}
                          >{bugName}</span>
                          的标准图像
                        </>
                      }
                    />
                  </div>
                </Card>
              </List.Item>
            );
          }}
        />
        <CreateInsectForm
          {...this.props}
          visible={modalVisible}
          type={modalType}
          current={currentInsect}
        />
      </div>
    )
      ;
  }

}

export default connect(
  (
    {
      insect: {
        insectTypes,
        modalVisible,
      },
    },
  ) => (
    {
      insectTypes,
      modalVisible,
    }
  ),
)(Insect);
