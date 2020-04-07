import React from 'react';
import { connect } from 'dva';
import { ImageLayer } from './KonvaEngine';
import { Stage, Layer } from 'react-konva';
import cn from 'classnames';

import styles from './components.less';

const PreViewer = (
  {
    className,
    wrapperStyle,
    src,
    picWidth,
    picHeight,
    stageWidth,
    stageHeight,
    mousePosition: { mouseX, mouseY },
    scale,
    dispatch,
  },
) => {

  const picX = (stageWidth / 2 - mouseX * scale);
  const picY = (stageHeight / 2 - mouseY * scale);


  return (
    <div className={cn(styles.PreViewer, className)} style={wrapperStyle}>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <ImageLayer
            src={src}
            width={picWidth}
            height={picHeight}
            scale={{ x: scale, y: scale }}
            x={picX}
            y={picY}
            onWheel={({ evt, evt: { deltaY } }) => {
              evt.preventDefault();
              let nextScale = Math.min(scale + .7, 10);
              if (deltaY > 0) {
                nextScale = Math.max(scale - .7, 1);
              }
              dispatch({
                type: 'previewer/setScale',
                payload: nextScale,
              });
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default connect(({ workspace, previewer }) => ({ ...workspace, ...previewer }))(PreViewer);
