import React, { useState } from 'react';
import { map } from 'lodash';
import cn from 'classnames';
import { insectUrlMapping } from '@/constants/insects';

import { Tabs } from 'antd';
import withHoverPager from '@/components/withHoverPager';
import FixHeightImg from '@/components/FixHeightImg';

import styles from './components.less';

const { TabPane } = Tabs;

const Item = ({ insectName }) => {
  const [current, setCurrent] = useState(0);

  if (!insectUrlMapping[insectName]) {
    return (
      <span> 暂无此类害虫的标准照 </span>
    );
  }

  const [urlList = []] = [insectUrlMapping[insectName]];
  const Viewer = withHoverPager(FixHeightImg);

  return (
    <>
      <Viewer
        wrapperStyles={{ height: 220 }}
        src={urlList[current]}
        height={220}
        current={current}
        total={urlList.length}
        onChange={page => setCurrent(page)}
        alt=""
      />
    </>
  );

};

const StandardPhoto = () => {

  return (
    <Tabs className={cn(styles.StandardPhoto, 'noBorderLeft')} tabPosition={'right'} type={'card'}>
      {
        map(['草地贪夜蛾', '暗黑鳃金龟', '白星花金龟1', '茶翅椿', '大地老虎', '大黑鳃金龟', '稻飞虱', '美国白蛾'], item => {
          return (
            <TabPane tab={item} key={item} className={styles.tabPane}>
              <Item insectName={item}/>
            </TabPane>
          );
        })
      }
    </Tabs>
  );

};

export default StandardPhoto;
