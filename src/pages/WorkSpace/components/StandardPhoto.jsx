import React, { useState } from 'react';
import { map } from 'lodash';
import cn from 'classnames';
import { bugUrlMapping } from '@/constants/bugs';

import { Tabs } from 'antd';
import withHoverPager from '@/components/withHoverPager';
import FixHeightImg from '@/components/FixHeightImg';

import styles from './components.less';

const { TabPane } = Tabs;

const Item = ({ bugName }) => {
  const [current, setCurrent] = useState(0);

  if (!bugUrlMapping[bugName]) {
    return (
      <span> 暂无此类害虫的标准照 </span>
    );
  }

  const [urlList = []] = [bugUrlMapping[bugName]];
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
              <Item bugName={item}/>
            </TabPane>
          );
        })
      }
    </Tabs>
  );

};

export default StandardPhoto;
