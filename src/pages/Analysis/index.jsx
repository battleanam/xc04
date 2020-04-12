import React, { useEffect } from 'react';
import { connect } from 'dva';
import { map } from 'lodash';
import moment from 'moment';
import { aSourceToOriginal, calcTSource, calcYSource } from '@/pages/Analysis/calculators/ASourceCalculator';

const Analysis = (
  {
    ASource,
    dispatch,
  },
) => {

  useEffect(() => {
    dispatch({
      type: 'analysis/getASource',
    });
  }, [dispatch]);

  return (
    <div>
    </div>
  );

};

export default connect(
  (
    {
      analysis: {
        ASource,
      },
    },
  ) => {

    const now = moment();

    const sourceGroupByDate = aSourceToOriginal(
      map(ASource, anno_info => {
        now.subtract(1, 'day');
        return {
          img_name: `1_${now.format('YYYYMMDD')}34324_sdf.jpg`,
          anno_info,
        };
      }),
    );

    const TSource = calcTSource(sourceGroupByDate);

    const YSource = calcYSource(TSource)

    return {
      YSource,
    };
  },
)(Analysis);
