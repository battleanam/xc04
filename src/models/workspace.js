import { map, filter, fill, slice, chunk } from 'lodash';
import { loadShapes, saveShapes } from '@/pages/WorkSpace/service';
import { v1 as uuid } from 'uuid';
import key from 'keymaster';
import { message } from 'antd';

const picHeight = 713;

const Model = {
  namespace: 'workspace',
  state: {
    visible: false, // 展示工作区模态框
    edited: false, // 是否编辑过
    src: '', // 图片路径
    filename: '', // 文件名称
    name: '', // 图片名称  拍摄时间
    deviceId: '', // 测报灯编号
    shapes: [], // 标注列表
    shapesLoading: false, // 读取标注列表时的加载状态
    currentShape: -1, // 当前点击选中的 shapeId
    viewport: { x: 0, y: 0 }, // 当前 previewer 展示区域在 konvaEngine 中的位置
    viewportVisible: false, // 是否展示 viewport
    originalAnnotation: {}, // 获取到的当前图片的原始信息
  },
  effects: {
    * saveShapes(_, { call, put, select }) {

      const {
        originalAnnotation: {
          height, weight, instruction,
        },
        filename,
        deviceId,
        shapes,
      } = yield select(({ workspace }) => workspace);

      const scale = picHeight / Math.min(height, weight);

      const detect_info = map(shapes, ({ cato, box, cnt4mask }) => ({
        cato,
        score: 1,
        box: map(box, n => n / scale),
        cnt4mask: chunk(chunk(map(cnt4mask, n => Math.round(n / scale)), 2), 1),
      }));

      const saved = yield call(
        saveShapes,
        filename,
        deviceId,
        {
          detect_info,
          weight,
          height,
          instruction,
        },
      );

      if (saved) {
        message.success('保存成功');

        yield put({ type: 'setEdited', payload: false });

      } else {
        message.error('保存失败，请稍后重试');
      }

    },
    * getShapes({ payload: filename }, { call, put, select }) {

      yield put({ type: 'setEdited', payload: false });

      yield put({ type: 'setShapesLoading', payload: true });

      const {
        detect_info = [],
        height = 2448,
        weight = 3264,
        instruction,
      } = yield call(loadShapes, filename);

      yield put({
        type: 'setOriginalAnnotation',
        payload: { height, weight, instruction },
      });

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

      yield put({ type: 'setShapes', payload: shapes });

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

      const id = uuid();

      yield put({
        type: 'setShapes',
        payload: [
          ...shapes,
          {
            id: id,
            cato: bugName,
            color,
            width,
            cnt4mask: payload,
            box: [x1, y1, x2, y2],
            type: 'supplement',
          },
        ],
      });

      yield put({ type: 'setEdited', payload: true });

      yield put({ type: 'setCurrentShape', payload: id });

    },
    * removeCurrentShape(_, { put, select }) {

      const { currentShape, shapes } = yield select(state => state.workspace);

      if (currentShape !== -1) {

        const del = window.confirm('确定删除这个标注框吗');

        if (del) {

          yield put({ type: 'setCurrentShape', payload: -1 });

          yield put({
            type: 'setShapes',
            payload: filter(shapes, ({ id }) => id !== currentShape),
          });

          yield put({ type: 'setEdited', payload: true });

        }
      }
    },
    * showViewport({ payload }, { put }) {

      yield put({ type: 'setViewport', payload });

      yield put({ type: 'setViewportVisible', payload: true });
    },
    * updateAShape({ payload, payload: { id } }, { put, select }) {

      const { shapes } = yield select(state => state.workspace);

      const index = shapes.findIndex(shape => shape.id = id);

      yield put({
        type: 'setShapes',
        payload: fill(slice(shapes), {
          ...shapes[index],
          ...payload,
        }, index, index + 1),
      });

      // const { shapes: s } = yield select(state => state.workspace);
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
    setViewport(state, { payload }) {
      return {
        ...state,
        viewport: payload,
      };
    },
    setViewportVisible(state, { payload }) {
      return {
        ...state,
        viewportVisible: payload,
      };
    },
    setOriginalAnnotation(state, { payload }) {
      return {
        ...state,
        originalAnnotation: payload,
      };
    },
    setEdited(state, { payload }) {
      return {
        ...state,
        edited: payload,
      };
    },
  },
  subscriptions: {
    keyDel({ dispatch }) {
      key('delete', () => {
        dispatch({
          type: 'removeCurrentShape',
        });
      });
    },
  },
};

export default Model;
