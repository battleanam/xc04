import React from 'react';
import cn from 'classnames';

import styles from './components.less';
import icons from '@/styles/icon.less';

const Logo = props => {
  const { text = '有害生物智能识别系统', style } = props;

  return (
    <div className={cn(styles.Logo)} style={{ ...style }}>
      <i className={cn(icons.iconfont, icons.icontree)}/>
      <span>{text}</span>
    </div>
  );
};

export default Logo;
