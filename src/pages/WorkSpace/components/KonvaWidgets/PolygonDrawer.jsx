import { Circle, Layer, Line } from 'react-konva';
import { map } from 'lodash';
import React from 'react';
import { message } from 'antd';

const PolygonDrawer = (
  {
    scale,
    drawing,
    points,
    movingPoint,
    strokeColor = 'red',
    dispatch,
  },
) => {

  const viewPoints = [...points, ...movingPoint];

  const addPoint = () => {
    if (drawing) {
      dispatch({
        type: 'previewer/setPoints',
        payload: [
          ...viewPoints,
        ],
      });
    }
  };

  const endDrawing = () => {
    if (drawing) {
      if (viewPoints.length > 6) {
        dispatch({
          type: 'workspace/addShape',
          payload: points,
        });
      }else {
        message.info('本次绘制被系统丢弃，因为绘制的点不足以构成多边形。');
      }
      dispatch({
        type: 'previewer/setPoints',
        payload: [],
      });
      dispatch({
        type: 'previewer/setMovingPoint',
        payload: [],
      });
      dispatch({
        type: 'previewer/setDrawing',
        payload: false,
      });
    }
  };

  return (
    <>
      <Layer>
        <Line
          x={0}
          y={0}
          stroke={strokeColor}
          strokeWidth={2 / scale}
          points={viewPoints}
        />
      </Layer>
      <Layer>
        {
          map(viewPoints, (point, index) => (

            index % 2 === 0 &&
            <Circle
              key={index}
              radius={3 / scale}
              fill={strokeColor}
              x={point}
              y={viewPoints[index + 1]}
              onClick={(e) => {
                const { currentTarget: { attrs: { x, y } } } = e;
                if (
                  (
                    Math.abs(x - viewPoints[0]) < 4.5 / scale
                    &&
                    Math.abs(y - viewPoints[1]) < 4.5 / scale
                  )
                  ||
                  (
                    Math.abs(x - points[points.length - 2]) < 4.5 / scale
                    &&
                    Math.abs(y - points[points.length - 1]) < 4.5 / scale
                  )
                ) {
                  endDrawing();
                } else if (index === viewPoints.length - 2) {
                  addPoint();
                }
              }}
            />
          ))
        }
        {
          viewPoints.length > 4 &&
          <Line
            x={0}
            y={0}
            stroke={strokeColor}
            dash={[6, 3]}
            strokeWidth={1 / scale}
            points={
              [
                viewPoints[0],
                viewPoints[1],
                viewPoints[viewPoints.length - 2],
                viewPoints[viewPoints.length - 1],
              ]
            }/>
        }
      </Layer>
    </>
  );

};

export default PolygonDrawer;
