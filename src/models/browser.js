const Model = {
  namespace: 'browser',
  state: {
    clientHeight: 1080,
    clientWidth: 1920,
  },
  effects: {
    * init(_, { put }) {
      const { clientWidth, clientHeight } = document.body;
      yield put({
        type: 'setClientHeight',
        payload: clientHeight,
      });
      yield put({
        type: 'setClientWidth',
        payload: clientWidth,
      });
    },
  },
  reducers: {
    setClientHeight(state, { payload }) {
      return {
        ...state,
        clientHeight: payload,
      };
    },
    setClientWidth(state, { payload }) {
      return {
        ...state,
        clientWidth: payload,
      };
    },
  },
  subscriptions: {
    resize({ dispatch }) {
      window.onresize = () => {
        dispatch({ type: 'init' });
      };
    },
  },
};

export default Model;
