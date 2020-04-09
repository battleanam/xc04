import { login } from '@/pages/User/service';
import router from 'umi/router';

const Model = {
  namespace: 'user',
  state: {
    username: '', // 登录用户名
    realName: '', // 用户实际名称
    password: '', // 登录密码
    loading: false, // 登录加载状态
    errorMsg: '', // 错误信息
  },
  effects: {
    * login(_, { call, put, select }) {
      yield put({ type: 'setLoading', payload: true });
      yield put({ type: 'setErrorMsg', payload: '' });
      const { username, password } = yield select(({ user }) => user);
      const { Code, msg } = yield call(login, username, password);
      if (Code === 1000) {
        sessionStorage.setItem('username', username);
        yield put({
          type: 'setUserInfo',
          payload: { username, realName: username, password: '' },
        });
        router.replace('home');
      } else {
        yield put({ type: 'setErrorMsg', payload: msg });
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },
  reducers: {
    setUserInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
    setErrorMsg(state, { payload }) {
      return {
        ...state,
        errorMsg: payload,
      };
    },
  },
};

export default Model;
