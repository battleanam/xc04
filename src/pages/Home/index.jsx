import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './index.less';
import { Button, List } from 'antd';
import PicBox from '@/pages/Home/components/PicBox';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewLength: 24,
    };
    this.requestBugTypes();
  }

  requestBugTypes() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bugs/getBugTypes',
    });
    dispatch({
      type: 'bugs/getBugImgUrlMap',
    });
  }

  render() {

    const { picList, picListLoading, bugStyles, viewLength, dispatch } = this.props;

    return (
      <div
        className={styles.Home}
      >
        <List
          rowKey={'id'}
          loading={picListLoading}
          grid={{
            gutter: 24,
            xxl: 4,
            xl: 4,
            lg: 4,
            md: 3,
            sm: 2,
            xs: 1,
          }}
          dataSource={picList.slice(0, viewLength)}
          renderItem={(item) => {
            return (
              <List.Item>
                <PicBox {...item} bugStyles={bugStyles}/>
              </List.Item>
            );
          }}
        />
        {
          viewLength < picList.length
          &&
          <Button type={'dashed'} block onClick={() => {
            dispatch({
              type: 'home/setViewLength',
              payload: Math.min(picList.length, viewLength + 12),
            });
          }}>加载更多</Button>
        }
      </div>
    );
  }
}

export default connect(({ home, bugs }) => ({ ...home, ...bugs }))(Home);
