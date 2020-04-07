import { message } from 'antd';

import { reduce, filter, findIndex } from 'lodash';
import uuid from 'uuid/v1';

import { getBugTypes, getBugImgUrlMap, addBugType, deleteBugType, updateBugType } from '@/pages/Insect/service';

function calcStylesFromTypeList(types) {
  return reduce(types, (result, type) => {
    const { bugName } = type;
    result[bugName] = type;
    return result;
  }, {});
}

const Model = {
  namespace: 'insect',
  state: {
    insectUrlMap: {}, // 害虫类型与图片地址的映射
    insectUrlMapLoading: true, // urlMap加载状态
    insectStyles: {}, // 害虫类型与标注框样式的映射
    insectTypes: [], // 害虫类型列表
    insectTypesLoading: true, // 害虫类型列表加载状态
    modalVisible: false, // 添加或修改害虫类型弹窗是否可见
    insectSaveLoading: false, // 保存害虫类型编辑时的加载状态
  },
  effects: {
    * getInsectImgUrlMap(_, { call, put }) {
      const { Code, data } = yield call(getBugImgUrlMap);
      let payload = {};
      if (Code === 1000) {
        payload = data;
      }
      yield put({
        type: 'setInsectUrlMap',
        payload,
      });
    },
    * getInsectTypes(_, { call, put }) {
      const { Code, data } = yield call(getBugTypes);
      let payload = [];
      if (Code === 1000) {
        payload = data;
      }
      yield put({
        type: 'setInsectTypes',
        payload,
      });
      yield put({
        type: 'setInsectStyles',
        payload: calcStylesFromTypeList(payload),
      });
    },
    * addInsectType({ payload, payload: { bugName, url, color, weight }, callback }, { call, put }) {
      yield put({ type: 'setInsectSaveLoading', payload: true });
      const { Code, Message } = yield call(addBugType, { ...payload, keyid: uuid() });
      if (Code === '1000') {
        yield put({
          type: 'addInsect',
          payload,
        });
        message.success('添加成功');
        callback && callback();
        yield put({ type: 'setModalVisible', payload: false });
      } else {
        message.error(Message);
      }
      yield put({ type: 'setInsectSaveLoading', payload: false });
    },
    * removeInsectType({ payload: { keyid } }, { call, put }) {
      yield put({ type: 'setInsectSaveLoading', payload: true });
      const { Code, Message } = yield call(deleteBugType, keyid);
      if (Code === '1000') {
        yield put({
          type: 'removeInsect',
          payload: { keyid },
        });
        message.success('删除成功');
        yield put({ type: 'setModalVisible', payload: false });
      } else {
        message.error(Message);
      }
      yield put({ type: 'setInsectSaveLoading', payload: false });
    },
    * updateInsectType({ payload }, { call, put }) {
      yield put({ type: 'setInsectSaveLoading', payload: true });
      const { Code, Message } = yield call(updateBugType, payload);
      if (Code === '1000') {
        yield put({
          type: 'updateInsect',
          payload,
        });
        message.success('修改成功');
        yield put({ type: 'setModalVisible', payload: false });
      } else {
        message.error(Message);
      }
      yield put({ type: 'setInsectSaveLoading', payload: false });
    },
  },
  reducers: {
    setInsectUrlMap(state, { payload }) {
      return {
        ...state,
        insectUrlMap: payload,
      };
    },
    setInsectStyles(state, { payload }) {
      return {
        ...state,
        insectStyles: payload,
      };
    },
    setInsectTypesLoading(state, { payload }) {
      return {
        ...state,
        insectTypesLoading: payload,
      };
    },
    setInsectTypes(state, { payload }) {
      return {
        ...state,
        insectTypes: payload,
      };
    },
    setInsectSaveLoading(state, { payload }) {
      return {
        ...state,
        insectSaveLoading: payload,
      };
    },
    setModalVisible(state, { payload }) {
      return {
        ...state,
        modalVisible: payload,
      };
    },
    addInsect(state, { payload }) {
      const { insectTypes } = state;
      return {
        ...state,
        insectTypes: [...insectTypes, payload],
      };
    },
    removeInsect(state, { payload: { keyid } }) {
      const { insectTypes } = state;
      return {
        ...state,
        insectTypes: filter(insectTypes, insect => insect.keyid !== keyid),
      };
    },
    updateInsect(state, { payload, payload: { keyid } }) {
      const insectTypes = [...state.insectTypes];
      const index = findIndex(insectTypes, insect => insect.keyid === keyid);
      insectTypes[index] = payload;
      return {
        ...state,
        insectTypes,
      };
    },
  },
};

export default Model;
