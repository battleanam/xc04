import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { Stage, Layer, Image, Line, Text, Rect } from 'react-konva';
import { map } from 'lodash';
import { Spin } from 'antd';

/**
 * 图像层
 * @param src 图像路径
 * @param width 图像宽度
 * @param height 图像高度
 * @param other 其他可传递到 konva Image 的属性
 * @returns {*}
 * @constructor
 */
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

/**
 * 单个标注多边形
 * @param id 当前标注的唯一标识
 * @param cato 标注文字
 * @param box 标注所占的矩形区域 [x1, y1, x2, y2]
 * @param cnt4mask 多边形的点阵 [x1, y1, x2, y2, ..., xn, yn]
 * @param color 多边形的颜色
 * @param lineWidth 多边形的线条粗细
 * @param bugName 当前选中的害虫名称
 * @param insectColor 当前选中害虫的标注颜色
 * @param insectWidth 当前选中害虫的标注线条粗细
 * @param currentShape 当前选中的标注框的id
 * @param dispatch 当前选中害虫的标注线条粗细
 * @returns {*}
 * @constructor
 */
const Polygon = (
  {
    id, cato, box, cnt4mask, color,
    width: lineWidth,
    selectedInsect: {
      bugName,
      color: insectColor,
      weight: insectWidth,
    }, currentShape,
    dispatch,
  },
) => {

  const [text, setText] = useState(cato);
  const [strokeColor, setStrokeColor] = useState(color);
  const [strokeWidth, setStrokeWidth] = useState(lineWidth);

  const onClick = ({ evt: { offsetX, offsetY } }) => {

    if (id === currentShape) {
      dispatch({
        type: 'workspace/setCurrentShape',
        payload: -1,
      });
    } else {
      dispatch({
        type: 'workspace/setCurrentShape',
        payload: id,
      });
    }

    dispatch({
      type: 'previewer/setMousePosition',
      payload: { mouseX: offsetX, mouseY: offsetY },
    });

    dispatch({
      type: 'previewer/setScale',
      payload: 2,
    });

  };

  const onDbClick = () => {
    timer && clearTimeout(timer);
    if (text !== bugName) {
      setText(bugName);
      setStrokeColor(insectColor);
      setStrokeWidth(insectWidth);
    } else {
      setText('');
      setStrokeColor('red');
      setStrokeWidth(1);
    }
  };

  let timer;

  return (
    <>
      <Line
        x={0}
        y={0}
        closed
        stroke={strokeColor}
        strokeWidth={strokeWidth + 1 + (1 * (currentShape === id))}
        points={cnt4mask}
        onDblClick={onDbClick}
        onClick={(e) => {
          timer && clearTimeout(timer);
          timer = setTimeout(() => {
            onClick(e);
          }, 250);
        }}
      />
      <Text
        text={text}
        // stroke={'rgba(0, 0, 0, 0.85)'}
        stroke={strokeColor}
        strokeWidth={1 + (currentShape === id)}
        y={(box[3] - box[1]) / 2 + box[1]}
        x={(box[2] - box[0]) / 2 + box[0]}
        onDblClick={onDbClick}
        onClick={(e) => {
          timer && clearTimeout(timer);
          timer = setTimeout(() => {
            onClick(e);
          }, 250);
        }}
      />
    </>
  );
};

/**
 * 存放预处理的标注多边形图层
 * @param shapes 预处理的多边形集合
 * @param selectedInsect 当前选中的害虫类型信息 {keyid, bugName, color, weight}
 * @param other
 * @param dispatch
 * @returns {*}
 * @constructor
 */
const PolygonLayer = ({ shapes, selectedInsect, dispatch, ...other }) => {
  return (
    <>
      {
        map(shapes, (shape) => (
          <Polygon
            key={shape.id}
            selectedInsect={selectedInsect}
            dispatch={dispatch}
            {...shape}
            {...other}
          />
        ))
      }
    </>
  );
};

/**
 * 标注引擎
 * @param src 图片路径
 * @param width 标注区域宽度
 * @param height 标注区域高度
 * @param shapes 预处理的图形
 * @param scale 缩放比例
 * @param shapesLoading 预处理图形的加载状态
 * @param selectedInsect 当前选中的害虫类型信息
 * @param currentShape 当前选中的标注框 id
 * @param viewport 在 previewer 点击寻找的位置
 * @param viewportVisible 是否展示 viewport
 * @param dispatch
 * @returns {*}
 * @constructor
 */
const KonvaEngine = (
  {
    src, width, height, shapes,
    shapesLoading, selectedInsect, scale,
    dispatch, currentShape, viewport, viewportVisible,
  },
) => {

  const stage = useRef();

  useEffect(() => {
    dispatch({
      type: 'previewer/setMousePosition',
      payload: { mouseX: width / 2, mouseY: height / 2 },
    });
  }, [dispatch, height, width, shapesLoading]);

  return (
    <Spin spinning={shapesLoading} tip={'正在智能识别，请稍后...'}>
      <Stage
        ref={stage}
        width={width}
        height={height}
        onClick={({ target, evt: { offsetX, offsetY } }) => {
          if (target.className === 'Image') {
            dispatch({
              type: 'workspace/setCurrentShape',
              payload: -1,
            });
            dispatch({
              type: 'previewer/setMousePosition',
              payload: { mouseX: offsetX, mouseY: offsetY },
            });
            dispatch({
              type: 'previewer/setScale',
              payload: 2,
            });
          }

        }}
      >
        <Layer>
          <ImageLayer
            src={src}
            width={width}
            height={height}
          />
        </Layer>
        <Layer>
          <PolygonLayer
            shapes={shapes}
            selectedInsect={selectedInsect}
            dispatch={dispatch}
            currentShape={currentShape}
          />
        </Layer>
        {
          viewportVisible &&
          <Layer>
            <Rect
              x={viewport.x - 385 / scale / 2}
              y={viewport.y - 385 / scale / 2}
              width={385 / scale}
              height={385 / scale}
              fill={'rgba(0, 255, 0, .3)'}
            />
          </Layer>
        }
      </Stage>
    </Spin>
  );
};

export default connect(
  (
    {
      workspace: {
        shapes,
        shapesLoading,
        currentShape,
        viewport,
        viewportVisible,
      },
      insect: {
        selectedInsect,
      },
      previewer: {
        scale,
      },
    },
  ) => (
    {
      shapes,
      shapesLoading,
      selectedInsect,
      scale,
      currentShape,
      viewport,
      viewportVisible,
    }
  ),
)(KonvaEngine);
