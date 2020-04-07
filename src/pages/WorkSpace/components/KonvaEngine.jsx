import React, { Component, useEffect, useState } from 'react';
import { connect } from 'dva';
import { Stage, Layer, Image, Line } from 'react-konva';
import { map } from 'lodash';
import { Spin } from 'antd';


export const ImageLayer = ({ src, width, height, ...other }) => {

  const [image, setImage] = useState();

  useEffect(() => {
    const img = new window.Image();
    img.width = width;
    img.height = height;
    img.addEventListener('load', () => setImage(img));
    img.src = src;
  }, [height, src, width]);

  return (
    <Image image={image} {...other}/>
  );
};

const PolygonLayer = ({ shapes }) => {
  return (
    <>
      {
        map(shapes, ({ box, cnt4mask }, index) => (
          <Line
            key={index}
            x={0}
            y={0}
            closed
            stroke={'red'}
            points={cnt4mask}
          />
        ))
      }
    </>
  );
};

class KonvaEngine extends Component {

  render() {

    const { src, width, height, shapes, shapesLoading, dispatch } = this.props;

    return (
      <Spin spinning={shapesLoading} tip={'正在智能识别，请稍后...'}>
        <Stage width={width} height={height} onClick={({ evt: { offsetX, offsetY } }) => {
          dispatch({
            type: 'previewer/setMousePosition',
            payload: { mouseX: offsetX, mouseY: offsetY },
          });
          dispatch({
            type: 'previewer/setScale',
            payload: 2,
          });
        }}>
          <Layer>
            <ImageLayer src={src} width={width} height={height}/>
          </Layer>
          <Layer>
            <PolygonLayer shapes={shapes}/>
          </Layer>
        </Stage>
      </Spin>
    );
  }

}

export default connect(({ workspace, insect }) => ({ ...workspace, ...insect }))(KonvaEngine);
