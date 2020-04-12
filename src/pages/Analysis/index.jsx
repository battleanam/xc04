import React, { useEffect } from 'react';
import { connect } from 'dva';

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
  });

  return (
    <div>
      {
        JSON.stringify(ASource)
      }
    </div>
  );

};

export default connect(() => ({}))(Analysis);
