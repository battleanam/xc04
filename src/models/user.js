const Model = {
  namespace: 'user',
  state: {
    username: '',
    realName: '',
  },
  reducers: {
    setUserInfo(state, { payload: { username, realName } }) {
      return {
        ...state,
        username,
        realName,
      };
    },
  },
  subscriptions: {
    init({dispatch}) {

    }
  }
};

export default Model;
