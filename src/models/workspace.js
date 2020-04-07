import { map } from 'lodash';
import { loadShapes } from '@/pages/WorkSpace/service';

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
  },
  effects: {
    * getShapes({ payload: filename }, { call, put }) {
      yield put({ type: 'setShapesLoading', payload: true });
      const {
        detect_info = [],
        height = 2448,
        weight = 3264,
      } = yield call(loadShapes, filename);
      const min = Math.min(height, weight); // 小边作为图片高度
      const scale = picHeight / min;

      const shapes = map(detect_info, info => {
        const {
          cato,
          box,
          cnt4mask,
        } = info;

        return {
          cato,
          box: box.map(n => n * scale),
          cnt4mask: cnt4mask.flat(2).map(n => n * scale),
        };

      });

      yield put({
        type: 'setShapes',
        payload: shapes,
      });
      yield put({ type: 'setShapesLoading', payload: false });
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
  },
};

export default Model;
