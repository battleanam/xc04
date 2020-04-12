import React from 'react';
import { Layout } from 'antd';
import { useDispatch } from 'dva';

import styles from './index.less';

const { Content } = Layout;

const EmptyLayout = ({ children }) => {

  const dispatch = useDispatch();

  dispatch({ type: 'browser/init' });

  return (
    <Layout className={styles.EmptyLayout}>
      <Content>
        {
          children
        }
      </Content>
    </Layout>
  );
};

export default EmptyLayout;
