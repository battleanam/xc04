import { slice } from 'lodash';
import { searchByStation } from '@/pages/Analysis/service';

const Model = {
  namespace: 'analysis',
  state: {
    ASource: [], // 统计源数据
  },
  effects: {
    * getASource(_, { call, put, select }) {
      const { deviceId } = yield select(({ device }) => device);
      yield put({ type: 'insect/getInsectTypes' });
      const list = yield call(searchByStation, deviceId);
      if (list) {
        yield put({ type: 'setASource', payload: slice(list.data, 0, 500) });
      } else {
        yield put({ type: 'setASource', payload: [] });
      }
    },
  },
  reducers: {
    setASource(state, { payload }) {
      return {
        ...state,
        ASource: payload,
      };
    },
  },
};

export default Model;
