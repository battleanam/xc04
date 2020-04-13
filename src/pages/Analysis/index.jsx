import React, { useEffect } from 'react';
import { connect } from 'dva';
import { aSourceToOriginal, calcTSource, calcYSource } from '@/pages/Analysis/calculators/ASourceCalculator';

import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';

import styles from './index.less';

const Analysis = (
  {
    YSource,
    width = 0,
    height = 0,
    dispatch,
  },
) => {

  useEffect(() => {
    dispatch({
      type: 'analysis/getASource',
    });

    return () => {
      dispatch({
        type: 'analysis/setASource',
        payload: []
      });
    }
  }, [dispatch]);

  // 定义度量
  const cols = {
    time: { alias: '时间' },
    count: { alias: '害虫数量' },
    bugName: { alias: '害虫名称' },
  };

  const titleStyles = {
    mainTitle: {
      fontSize: 20,
      color: 'black',
      textAlign: 'center',
    },
    subTitle: {
      fontSize: 16,
      color: 'gray',
      textAlign: 'center',
    },
  };

  return (
    <div
      className={styles.Analysis}
    >
      <Chart
        height={height}
        width={width}
        data={YSource}
        scale={cols}
      >
        <h3 className='main-title' style={titleStyles.mainTitle}>
          虫情分析
        </h3>
        <h4 className='sub-title' style={titleStyles.subTitle}>
          近一年已识别的虫种汇总
        </h4>
        <Axis name={'time'} title/>
        <Axis name={'count'} title/>
        <Legend/>
        <Tooltip/>
        <Geom
          type={'line'}
          position={'time*count'}
          color={'bugName'}
          shape={'smooth'}
        />
        <Geom
          type={'point'}
          position={'time*count'}
          color={'bugName'}
          shape={'circle'}
        />
      </Chart>
    </div>
  );

};

export default connect(
  (
    {
      analysis: {
        ASource,
      },
      insect: {
        insectTypes,
      },
    },
  ) => {

    if (!ASource.length) {
      return {
        YSource: [],
      };
    }

    const sourceGroupByDate = aSourceToOriginal(ASource, insectTypes);

    const TSource = calcTSource(sourceGroupByDate);

    const YSource = calcYSource(TSource);

    return {
      YSource,
    };
  },
)(Analysis);
