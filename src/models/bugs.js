import { reduce } from 'lodash';
import { getBugTypes, getBugImgUrlMap } from '@/pages/Bugs/service';

function calcStylesFromTypeList(types) {
  return reduce(types, (result, type) => {
    const { bugName } = type;
    result[bugName] = type;
    return result;
  }, {});
}

const Model = {
  namespace: 'bugs',
  state: {
    bugUrlMap: {}, // 害虫类型与图片地址的映射
    bugUrlMapLoading: true, // urlMap加载状态
    bugStyles: {}, // 害虫类型与标注框样式的映射
    bugTypes: [], // 害虫类型列表
    bugTypesLoading: true, // 害虫类型列表加载状态
  },
  effects: {
    * getBugImgUrlMap(_, { call, put }) {
      const { Code, data } = yield call(getBugImgUrlMap);
      let payload = {};
      if (Code === 1000) {
        payload = data;
      }
      yield put({
        type: 'setBugUrlMap',
        payload,
      });
    },
    * getBugTypes(_, { call, put }) {
      const { Code, data } = yield call(getBugTypes);
      let payload = [];
      if (Code === 1000) {
        payload = data;
      }
      yield put({
        type: 'setBugTypes',
        payload,
      });
      yield put({
        type: 'setBugStyles',
        payload: calcStylesFromTypeList(payload),
      });
    },
  },
  reducers: {
    setBugUrlMap(state, { payload }) {
      return {
        ...state,
        bugUrlMap: payload,
      };
    },
    setBugStyles(state, { payload }) {
      return {
        ...state,
        bugStyles: payload,
      };
    },
    setBugTypes(state, { payload }) {
      return {
        ...state,
        bugTypes: payload,
      };
    },
  },
};

export default Model;
