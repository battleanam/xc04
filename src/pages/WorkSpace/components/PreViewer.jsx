import React from 'react';
import cn from 'classnames';

import styles from './components.less';

const PreViewer = ({ className, wrapperStyle, src }) => {

  return (
    <div className={cn(styles.PreViewer, className)} style={wrapperStyle}>
      <img src={src} alt="" style={{ width: '100%', height: '100%' }}/>
    </div>
  );
};

export default PreViewer;
