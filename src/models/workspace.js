import { map } from 'lodash';
import { loadShapes } from '@/pages/WorkSpace/service';
import { v1 as uuid } from 'uuid';

const picHeight = 713;

const Model = {
  namespace: 'workspace',
  state: {
    visible: false, // 展示工作区模态框
    src: '', // 图片路径
    filename: '', // 文件名称
    name: '', // 图片名称  拍摄时间
    deviceId: '', // 测报灯编号
    shapes: [], // 标注列表
    shapesLoading: false, // 读取标注列表时的加载状态
    currentShape: -1, // 当前点击选中的 shapeId
  },
  effects: {
    * getShapes({ payload: filename }, { call, put, select }) {
      yield put({ type: 'setShapesLoading', payload: true });
      const {
        detect_info = [],
        height = 2448,
        weight = 3264,
      } = yield call(loadShapes, filename);
      const min = Math.min(height, weight); // 小边作为图片高度
      const scale = picHeight / min;

      const insectStyles = yield select(({ insect }) => insect.insectStyles);

      const shapes = map(detect_info, info => {
        const {
          cato,
          box,
          cnt4mask,
        } = info;

        const style = insectStyles[cato];

        return {
          id: uuid(),
          cato: style ? cato : '',
          box: box.map(n => n * scale),
          cnt4mask: cnt4mask.flat(2).map(n => n * scale),
          color: style ? style.color : 'red',
          width: style ? style.weight : 1,
        };

      });

      yield put({
        type: 'setShapes',
        payload: shapes,
      });
      yield put({ type: 'setShapesLoading', payload: false });
    },
    * addShape({ payload }, { select, put }) {

      const { shapes } = yield select(state => state.workspace);
      const {
        selectedInsect = {
          color: 'red',
          weight: 1,
          bugName: '',
        },
      } = yield select(state => state.insect);

      const { color, weight: width, bugName } = selectedInsect;

      let [x1, y1, x2, y2, ...other] = payload;

      other.forEach((num, index) => {
        switch (index % 2) {
          case 0:
            x1 = Math.min(x1, num);
            x2 = Math.max(x2, num);
            break;
          case 1:
            y1 = Math.min(y1, num);
            y2 = Math.max(y2, num);
            break;
          default:
            break;
        }
      });

      yield put({
        type: 'setShapes',
        payload: [
          ...shapes,
          {
            id: uuid(),
            cato: bugName,
            color,
            width,
            cnt4mask: payload,
            box: [x1, y1, x2, y2],
            type: 'supplement'
          },
        ],
      });
    },
  },
  reducers: {
    setVisible(state, { payload }) {
      return {
        ...state,
        visible: payload,
      };
    },
    setPicInfo(state, { payload: { src, filename, name, deviceId } }) {
      return {
        ...state,
        src, filename, name, deviceId,
      };
    },
    setShapes(state, { payload }) {
      return {
        ...state,
        shapes: payload,
      };
    },
    setShapesLoading(state, { payload }) {
      return {
        ...state,
        shapesLoading: payload,
      };
    },
    setCurrentShape(state, { payload }) {
      return {
        ...state,
        currentShape: payload,
      };
    },
  },
};

export default Model;
