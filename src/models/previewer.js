const Model = {
  namespace: 'previewer',
  state: {
    mousePosition: { mouseX: 0, mouseY: 0 }, // 鼠标点击位置
    scale: 1, // 图片缩放比例
    drawing: false, // 是否处于绘制状态
    points: [], // 绘制矩形时的点集
    movingPoint: [], // 跟随鼠标移动的点的坐标
  },
  reducers: {
    setMousePosition(state, { payload }) {
      return {
        ...state,
        mousePosition: payload,
      };
    },
    setScale(state, { payload }) {
      return {
        ...state,
        scale: payload,
      };
    },
    setDrawing(state, { payload }) {
      return {
        ...state,
        drawing: payload,
      };
    },
    setPoints(state, { payload }) {
      return {
        ...state,
        points: payload,
      };
    },
    setMovingPoint(state, { payload }) {
      return {
        ...state,
        movingPoint: payload,
      };
    },
  },
};

export default Model;
