import React, { Component } from 'react';
import cn from 'classnames';

import styles from './index.less';

function withHoverPager(WrappedComponent) {
  return class extends Component {

    render() {

      const { current = 0, total = 1, onChange, ...wrappedProps } = this.props;
      const { className, wrapperStyles } = wrappedProps;
      return (
        <div className={cn(styles.HoverPager, className)} style={wrapperStyles}>
          <div className={styles.wrappedComponent}>
            <WrappedComponent {...wrappedProps}/>
          </div>
          <div className={cn(styles.leftArrow, { [styles.disabled]: current === 0 })} onClick={() => {
            if (current > 0) {
              onChange(current - 1);
            }
          }}>
            <svg t="1583219238410" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="2738" width="1em" height="1em">
              <path
                d="M673.37 72.41a25 25 0 0 0-35.32-1.47L180.14 492.25a25 25 0 0 0 0 36.75L638 952.61a25 25 0 1 0 34-36.7L234 510.69l438-403a25 25 0 0 0 1.37-35.28z"
                p-id="2739" fill="#f0f0f0"/>
            </svg>
          </div>

          <div className={cn(styles.rightArrow, { [styles.disabled]: current === total - 1 })} onClick={() => {
            if (current < total - 1) {
              onChange(current + 1);
            }
          }}>
            <svg t="1583219294292" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="3020" width="1em" height="1em">
              <path
                d="M316.54 951.19a25 25 0 0 0 35.32 1.47l457.9-421.31a25 25 0 0 0 0.06-36.75L351.91 71a25 25 0 0 0-34 36.71L756 512.9l-438 403a25 25 0 0 0-1.46 35.29z"
                p-id="3021" fill="#f0f0f0"/>
            </svg>
          </div>

          <div className={styles.pagerInfo}>
            {
              total === 1 && <span> 1 of 1 </span>
            }
            {
              current === 0 && current < total - 1 && <span> 这是第一张图片 </span>
            }
            {
              current > 0 && current === total - 1 && <span> 这是最后一张图片 </span>
            }
            {
              current > 0 && current < total - 1 && <span> {current + 1} of {total} </span>
            }
          </div>
        </div>
      );
    }
  };
};

export default withHoverPager;
