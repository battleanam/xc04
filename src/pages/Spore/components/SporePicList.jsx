import React, { useEffect } from 'react';
import { connect } from 'dva';
import { slice } from 'lodash';

import { List } from 'antd';

const SporePicList = (
  {
    picList,
    picListLoading,
    dispatch,
  },
) => {

  useEffect(() => {
    dispatch({
      type: 'spore/loadPics',
    });
  }, [dispatch]);

  return (
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
      dataSource={slice(picList, 0, 20)}
      renderItem={(item) => {
        return (
          <List.Item>
            <img style={{ width: '100%' }} src={item.src} alt={''}/>
          </List.Item>
        );
      }}
    />
  );

};

export default connect(
  (
    {
      spore: {
        picList,
      },
    },
  ) => (
    {
      picList,
    }
  ),
)(SporePicList);
