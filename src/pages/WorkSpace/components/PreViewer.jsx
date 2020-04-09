import React from 'react';
import { connect } from 'dva';
import { ImageLayer } from './KonvaEngine';
import { Stage, Layer, Line } from 'react-konva';
import { findIndex } from 'lodash';
import cn from 'classnames';

import styles from './components.less';
import PolygonDrawer from '@/pages/WorkSpace/components/KonvaWidgets/PolygonDrawer';

const PreViewer = (props) => {

  const {
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
    currentShape,
    shapes,
    drawing,
  } = props;

  const picX = (stageWidth / 2 - mouseX * scale);
  const picY = (stageHeight / 2 - mouseY * scale);

  const index = findIndex(shapes, shape => shape.id === currentShape);
  const shape = shapes[index];


  return (
    <div className={cn(styles.PreViewer, className)} style={wrapperStyle}>
      <Stage
        width={stageWidth}
        height={stageHeight}
        draggable
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
        onDragEnd={({ currentTarget: { attrs: { x, y } } }) => {
          dispatch({
            type: 'previewer/setMousePosition',
            payload: {
              mouseX: (stageWidth / 2 - x) / scale,
              mouseY: (stageHeight / 2 - y) / scale,
            },
          });
        }}
        onMouseMove={({ evt: { offsetX, offsetY } }) => {
          if (drawing) {
            dispatch({
              type: 'previewer/setMovingPoint',
              payload: [
                (offsetX - picX) / scale,
                (offsetY - picY) / scale,
              ],
            });
          }
        }}
      >
        <Layer>
          <ImageLayer
            src={src}
            width={picWidth}
            height={picHeight}
            onDblClick={({ evt: { offsetX, offsetY } }) => {
              if (!drawing) {
                dispatch({
                  type: 'previewer/setPoints',
                  payload: [
                    (offsetX - picX) / scale,
                    (offsetY - picY) / scale,
                  ],
                });
                dispatch({
                  type: 'previewer/setDrawing',
                  payload: true,
                });
              }
            }}
          />
        </Layer>
        {
          currentShape !== -1 &&
          <Layer>
            <Line
              x={0}
              y={0}
              closed
              strokeWidth={1 / scale}
              stroke={'red'}
              points={shape.cnt4mask}
            />

          </Layer>
        }

        {
          drawing &&
          <PolygonDrawer {...props} scale={scale}/>
        }

      </Stage>
    </div>
  );
};

export default connect(({ workspace, previewer }) => ({ ...workspace, ...previewer }))(PreViewer);
