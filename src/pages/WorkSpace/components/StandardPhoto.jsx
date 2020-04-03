import React from 'react';
import { map } from 'lodash';
import cn from 'classnames';

import { Tabs } from 'antd';
import FixHeightImg from '@/components/FixHeightImg';

import styles from './components.less';
const { TabPane } = Tabs;

const StandardPhoto = ({}) => {

  return (
    <Tabs className={cn(styles.StandardPhoto, "noBorderLeft")} tabPosition={'right'} type={'card'}>
      {
        map(['草地贪夜蛾', '松褐天牛1', '扬善洲蛾1', '松褐天牛2', '扬善洲蛾2', '松褐天牛3', '扬善洲蛾3', '松褐天牛4'], item => (
          <TabPane tab={item} key={item} className={styles.tabPane}>
            <FixHeightImg src={require('@/assets/img/1.JPG')} alt="" height={200}/>
            <div className={styles.picSelector}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </TabPane>
        ))
      }
    </Tabs>
  );

};

export default StandardPhoto;
