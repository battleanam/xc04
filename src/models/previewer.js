import { dropRight } from 'lodash';
import key from 'keymaster';

const Model = {
  namespace: 'previewer',
  state: {
    mousePosition: { mouseX: 0, mouseY: 0 }, // 鼠标点击位置
    scale: 1, // 图片缩放比例
    drawing: false, // 是否处于绘制状态
    points: [], // 绘制矩形时的点集
    movingPoint: [], // 跟随鼠标移动的点的坐标
  },
  effects: {
    * dropPoint(_, { select, put }) {
      const { points, drawing } = yield select(state => state.previewer);
      if (drawing) {
        yield put({
          type: 'setPoints',
          payload: dropRight(points, 2),
        });
        if (points.length === 2) {
          yield put({
            type: 'setDrawing',
            payload: false,
          });
          yield put({
            type: 'setMovingPoint',
            payload: [],
          });
        }
      }
    },
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
  subscriptions: {
    keyCtrlZ({ dispatch }) {
      key('⌘+z, ctrl+z', () => {
        dispatch({
          type: 'dropPoint',
        });
      });
    },
  },
};

export default Model;
