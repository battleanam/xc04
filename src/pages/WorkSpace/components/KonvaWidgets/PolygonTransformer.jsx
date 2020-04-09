import React, { useEffect } from 'react';
import { Line, Transformer } from 'react-konva';

const PolygonTransformer = (
  {
    id, cato, box, cnt4mask,
    color, width: lineWidth,
  },
) => {

  const shapeRef = React.useRef();
  const trRef = React.useRef();

  useEffect(() => {
    trRef.current.setNode(shapeRef.current);
    trRef.current.getLayer().batchDraw();
  }, [id]);

  return (
    <>
      <Line
        ref={shapeRef}
        x={0}
        y={0}
        closed
        draggable
        strokeWidth={1}
        stroke={'red'}
        points={cnt4mask}
      />
      <Transformer
        ref={trRef}
      />
    </>
  );
};

export default PolygonTransformer;
