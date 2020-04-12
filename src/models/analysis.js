import { searchByStation } from '@/pages/Analysis/service';

const Model = {
  namespace: 'analysis',
  state: {
    ASource: [], // 统计源数据

  },
  effects: {
    * getASource(_, { call, put, select }) {
      const { deviceId } = yield select(({ device }) => device);
      console.log(deviceId)
      const list = yield call(searchByStation, deviceId);
      console.log(list);
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
