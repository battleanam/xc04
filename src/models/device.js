import moment from 'moment';
import { delay } from '@/utils/dvaHelper';
import { message } from 'antd';

const imgList = [
  {
    filename: '69040201_20190826054047760_01.jpg',
    url: require('@/assets/img/69040201_20190826054047760_01.jpg'),
  },
  {
    filename: '69040201_20190826054047760_01.jpg',
    url: require('@/assets/img/69040201_20190826054047760_01.jpg'),
  },
  {
    filename: '69040201_20190826054047760_01.jpg',
    url: require('@/assets/img/69040201_20190826054047760_01.jpg'),
  },
];

const statusList = [
  {
    msg: '正在打开补光灯',
    ms: 1500,
    process: 0,
  },
  {
    msg: '补光灯已打开',
    ms: 500,
    process: 1,
  },
  {
    msg: '正在拍照',
    ms: 1500,
    process: 2,
  },
  {
    msg: '拍照完成，正在上传到云服务器',
    ms: 1500,
    process: 3,
  },
  {
    msg: '上传完毕',
    ms: 1500,
    process: 4,
  },
  {
    msg: '',
    ms: 1500,
    process: 5,
  },
];

const Model = {
  namespace: 'device',
  state: {
    deviceId: '69060502', // 设备编号
    online: 1, // 设备是否在线 0离线 1在线
    insectLamp: 1, // 诱虫灯开关
    LED: 0, // 补光灯开关 0关 1开
    heating_1: 0, // 加热板开关 0关 1开
    heating_2: 0, // 加热板开关 0关 1开
    board: 1, // 翻版是否在线
    rain: 1, // 接雨模块
    insectClean: 1, // 清虫模块
    disc: 1, // 圆盘
    status: '', // 当前工作状态 补光灯、加热、拍照 为空表示没在工作
    statusIndex: -1, // 当前工作状态下标
    prePhoto: [], // 预先准备好的照片路径
    photoTakeMoment: moment(), // 点击拍照的时间
    currentPic: 0, // 当前已经加入图片列表的图片下标
  },
  effects: {
    * takePhoto(_, { put, select }) {
      const { status, currentPic } = yield select(({ device }) => device);
      if (status) {
        message.info('设备正在工作，请稍后再进行操作');
      } else {
        for (let i = 0; i < statusList.length; i++) {

          yield put({ type: 'setStatusIndex', payload: i });

          const { ms, msg } = statusList[i];

          switch (i) {
            case 1:
              yield put({
                type: 'setLED',
                payload: 1,
              });
              break;
            case 3:
              yield put({
                type: 'setLED',
                payload: 0,
              });
              break;
            default:
              break;
          }
          yield put({ type: 'setStatus', payload: msg });
          yield delay(ms);
        }

        yield put({ type: 'addPrePhoto' });
        yield put({ type: 'setStatusIndex', payload: -1 });

        yield put({
          type: 'setCurrentPic',
          payload: currentPic + 1,
        });
      }
    },
  },
  reducers: {
    setDeviceId(state, { payload }) {
      return {
        ...state,
        deviceId: payload,
      };
    },
    setOnline(state, { payload }) {
      return {
        ...state,
        online: payload,
      };
    },
    setStatus(state, { payload }) {
      return {
        ...state,
        status: payload,
      };
    },
    setLED(state, { payload }) {
      return {
        ...state,
        LED: payload,
      };
    },
    setInsectLamp(state, { payload }) {
      return {
        ...state,
        insectLamp: payload,
      };
    },
    setHeating_1(state, { payload }) {
      return {
        ...state,
        heating_1: payload,
      };
    },
    setHeating_2(state, { payload }) {
      return {
        ...state,
        heating_2: payload,
      };
    },
    setBoard(state, { payload }) {
      return {
        ...state,
        board: payload,
      };
    },
    setRain(state, { payload }) {
      return {
        ...state,
        rain: payload,
      };
    },
    setInsectClean(state, { payload }) {
      return {
        ...state,
        insectClean: payload,
      };
    },
    setDisc(state, { payload }) {
      return {
        ...state,
        disc: payload,
      };
    },
    setPrePhoto(state, { payload }) {
      return {
        ...state,
        prePhoto: payload,
      };
    },
    addPrePhoto(state) {
      const { prePhoto, currentPic } = state;
      return {
        ...state,
        prePhoto: [
          ...prePhoto,
          imgList[currentPic],
        ],
      };
    },
    setPhotoTakeMoment(state, { payload }) {
      return {
        ...state,
        photoTakeMoment: payload,
      };
    },
    setDeviceList(state, { payload }) {
      let deviceId = '';
      if (Array.isArray(payload) && payload.length) {
        deviceId = payload[0];
      }
      return {
        ...state,
        deviceId,
        deviceList: payload,
      };
    },
    setCurrentPic(state, { payload }) {
      return {
        ...state,
        currentPic: payload,
      };
    },
    setStatusIndex(state, { payload }) {
      return {
        ...state,
        statusIndex: payload,
      };
    },
  },
};

export default Model;
