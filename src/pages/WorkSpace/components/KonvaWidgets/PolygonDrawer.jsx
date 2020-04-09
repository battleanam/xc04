import { Circle, Layer, Line } from 'react-konva';
import { map } from 'lodash';
import React from 'react';

const PolygonDrawer = (
  {
    scale,
    drawing,
    points,
    movingPoint,
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
      dispatch({
        type: 'workspace/addShape',
        payload: viewPoints,
      });
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
          stroke={'red'}
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
              radius={4 / scale}
              fill={'red'}
              x={point}
              y={viewPoints[index + 1]}
              onClick={(e) => {
                const { evt: { offsetX: x, offsetY: y } } = e;
                if (
                  Math.abs(x - viewPoints[0]) < 4 / scale
                  &&
                  Math.abs(y - viewPoints[1]) < 4 / scale
                ) {
                  endDrawing();
                } else if (index === viewPoints.length - 2) {
                  addPoint();
                }
              }}
            />
          ))
        }
      </Layer>
    </>
  );

};

export default PolygonDrawer;
