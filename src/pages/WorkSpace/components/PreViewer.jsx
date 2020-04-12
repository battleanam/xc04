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
    mousePosition: {
      mouseX,
      mouseY,
    },
    scale,
    dispatch,
    currentShape,
    shapes,
    drawing,
    // selectedInsect = { color: 'red' },
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
        onDragMove={
          (
            {
              currentTarget: { attrs: { x, y } },
            },
          ) => {
            dispatch({
              type: 'workspace/showViewport',
              payload: {
                x: -(x - stageWidth / 2) / scale,
                y: -(y - stageWidth / 2) / scale,
              },
            });
          }
        }
        onDragEnd={
          (
            {
              currentTarget: { attrs: { x, y } },
            },
          ) => {
            dispatch({
              type: 'previewer/setMousePosition',
              payload: {
                mouseX: (stageWidth / 2 - x) / scale,
                mouseY: (stageHeight / 2 - y) / scale,
              },
            });
            dispatch({
              type: 'workspace/setViewportVisible',
              payload: false,
            });
          }
        }
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
                dispatch({
                  type: 'workspace/setCurrentShape',
                  payload: -1,
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
          <PolygonDrawer
            {...props}
            scale={scale}
            strokeColor={'red'}
          />
        }

      </Stage>
    </div>
  );
};

export default connect(
  (
    {
      workspace: {
        src,
        currentShape,
        shapes,
      },
      previewer: {
        scale,
        drawing,
        mousePosition,
        points,
        movingPoint,
      },
      insect: {
        selectedInsect,
      },
    },
  ) => (
    {
      src,
      mousePosition,
      scale,
      currentShape,
      shapes,
      drawing,
      selectedInsect,
      points,
      movingPoint,
    }
  ),
)(PreViewer);
