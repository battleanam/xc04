import React, { useState } from 'react';
import { map } from 'lodash';
import cn from 'classnames';
import { insectUrlMapping } from '@/constants/insects';
import { connect } from 'dva';

import { Tabs } from 'antd';
import withHoverPager from '@/components/withHoverPager';
import FixHeightImg from '@/components/FixHeightImg';

import styles from './components.less';

const { TabPane } = Tabs;

const Item = ({ insectName, color }) => {
  const [current, setCurrent] = useState(0);

  if (!insectUrlMapping[insectName]) {
    return (
      <span
        className={styles.noImgInfo}
      >
        暂无
        <span style={{ color }}>{insectName}</span>
        的标准照
      </span>
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
        alt={''}
      />
    </>
  );

};

const StandardPhoto = ({ selectedInsect, insectTypes, dispatch }) => {

  return (
    <Tabs
      className={cn(styles.StandardPhoto, 'noBorderLeft')}
      tabPosition={'right'}
      type={'card'}
      activeKey={selectedInsect.keyid}
      onChange={keyid => {
        const insect = insectTypes.find(insect => insect.keyid === keyid);
        dispatch({
          type: 'insect/setSelectedInsect',
          payload: { ...insect },
        });
      }}
    >
      {
        map(insectTypes, ({ bugName, keyid, color, weight }) => {
          return (
            <TabPane tab={
              <div
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div style={{
                  width: 16,
                  height: 12,
                  border: `${weight}px solid ${color}`,
                  marginRight: 4,
                }}/>
                <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{bugName}</span>
              </div>
            } key={keyid} className={styles.tabPane}>
              <Item insectName={bugName} color={color}/>
            </TabPane>
          );
        })
      }
    </Tabs>
  );

};

export default connect(
  (
    {
      insect: {
        selectedInsect,
        insectTypes,
      },
    },
  ) => (
    {
      selectedInsect,
      insectTypes,
    }
  ),
)(StandardPhoto);
