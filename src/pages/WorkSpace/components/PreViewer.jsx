import React from 'react';
import cn from 'classnames';

import styles from './components.less';

const PreViewer = ({ className }) => {


  return (
    <div className={cn(styles.PreViewer, className)}>
    </div>
  );
};

export default PreViewer;
