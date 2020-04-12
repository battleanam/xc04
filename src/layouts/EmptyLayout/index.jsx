import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch } from 'dva';

import styles from './index.less';

const { Content } = Layout;

const EmptyLayout = ({ children }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'browser/init' });
  }, [dispatch]);


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
