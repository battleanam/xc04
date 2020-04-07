import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './index.less';

const FixHeightImg = ({ src, alt = '', height, className, noData = '图像加载失败' }) => {

  const wrapper = useRef();
  const [width, setWidth] = useState(0);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const { clientWidth } = wrapper.current;
    const temp = new Image();
    temp.onload = () => {
      let { naturalWidth, naturalHeight } = temp;
      setRotate(naturalHeight > naturalWidth);
      const result = height * naturalWidth / naturalHeight;
      setWidth(Math.floor(Math.min(clientWidth, result)) + 'px');
    };
    temp.src = src;
  }, [height, rotate, src]);

  return (
    <div className={cn(className, styles.FixHeightImg)} ref={wrapper} style={{ width: '100%', height }}>
      {
        src ?
          <img src={src} alt={alt} style={{ width }}/> :
          <div className={styles.noData}>
            <span>{noData}</span>
          </div>
      }
    </div>
  );
};

export default FixHeightImg;
