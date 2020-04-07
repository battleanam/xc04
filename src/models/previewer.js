const Model = {
  namespace: 'previewer',
  state: {
    mousePosition: { mouseX: 0, mouseY: 0 }, // 鼠标点击位置
    scale: 1, // 图片缩放比例
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
  },
};

export default Model;
