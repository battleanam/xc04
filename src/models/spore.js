import moment from 'moment';
import { loadPics } from '@/pages/Home/service';
import { concat, map, split } from 'lodash';
import { message } from 'antd';

const str = ['[2020/4/13 12:15:39] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:39] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:39] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:39] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:39] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:39] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:40] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:40] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:40] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:40] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:40] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:41] 16123456:Info:HB--21016 \n' +
  '[2020/4/13 12:15:41] Dev is not valid! :16123456\n' +
  '[2020/4/13 12:15:41] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:41] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:41] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:41] 45237404:Info:HB--29056 \n' +
  '[2020/4/13 12:15:41] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:41] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:42] Get msg from id:45237404\n' +
  '[2020/4/13 12:15:42] Handling Info For Dev:45237404\n' +
  '[2020/4/13 12:15:42] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:42] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:42] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:42] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:43] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:43] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:43] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:43] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:43] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:43] 30040603:Data:0,21,0,43,41,24,25,99, \n' +
  '[2020/4/13 12:15:44] Get msg from id:30040603\n' +
  '[2020/4/13 12:15:44] Handling Data For Dev:30040603Data0,21,0,43,41,24,25,99, \n' +
  '[2020/4/13 12:15:44] [DBMsgHandler] insert data to XQH Table!\n' +
  '[2020/4/13 12:15:44] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:44] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:44] 30040608:Info:HB-1380 \n' +
  '[2020/4/13 12:15:44] Get msg from id:30040608\n' +
  '[2020/4/13 12:15:44] Handling Info For Dev:30040608\n' +
  '[2020/4/13 12:15:44] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:45] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:45] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:45] 60031447:Info:HB-23660 \n' +
  '[2020/4/13 12:15:45] Dev is not valid! :60031447\n' +
  '[2020/4/13 12:15:45] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:45] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:45] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:45] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:45] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:46] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:46] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:46] 20011003:Info:HB-233430, Count1-0 Count2-0 \n' +
  '[2020/4/13 12:15:46] Get msg from id:20011003\n' +
  '[2020/4/13 12:15:46] Handling Info For Dev:20011003\n' +
  '[2020/4/13 12:15:46] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:46] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:47] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:47] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:47] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:47] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:47] Far IP:122.97.179.100:44420 cmd unknow: t\n' +
  '[2020/4/13 12:15:47] Far IP:122.97.179.100:44420 cmd unknow: t'
];

const Model = {
  namespace: 'spore',
  state: {
    logs: split(str[0], '\n'), // 设备运行日志
    sporeId: '89072201', // 设备ID
    picList: [], // 设备图像列表
    currentPic: -1, // 当前图片
    prePhoto: [], // 准备好的图片列表
    photoTakeMoment: moment(), // 点击拍照的时间
    picListLoading: false, // 图片加载状态
    startUpTime: moment(), // 启动时间
    glueSprayingTime: moment(), // 喷胶时间
    adsorbTime: moment(), // 鼓风时间 开始吸附孢子的时间
    speed: 4, // 摄像头移动速度
    status: 1, // 设备状态
    workInterval: 3, // 工作时间间隔 每x小时
  },
  effects: {
    * loadPics(_, { select, call, put }) {
      const { sporeId, prePhoto, photoTakeMoment } = yield select(({ spore }) => spore);
      const { Code, data, msg } = yield call(loadPics,'2019-01-01', '2020-04-13', sporeId);
      if (Code === 1000) {
        const picList = JSON.parse(data);
        yield put({
          type: 'setPicList',
          payload: concat(
            map(prePhoto, ({ url, filename }) => ({
              id: filename,
              deviceId: sporeId,
              name: photoTakeMoment.format('YYYY-MM-DD HH:mm:ss'),
              src: url,
              filename,
            })),
            map(picList, pic => {
              const filename = pic.split(',')[0];
              const [deviceId, date] = filename.split('_');
              const year = date.slice(0, 4),
                month = date.slice(4, 6),
                day = date.slice(6, 8),
                hours = date.slice(8, 10),
                minutes = date.slice(10, 12),
                seconds = date.slice(12, 14);
              const name = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
              const id = filename.split('.')[0];
              return {
                id,
                deviceId,
                name,
                filename,
                src: `${window.host}/Su/GetBigPic?filename=${filename}`,
                smallSrc: `${window.host}/Su/GetSmallPic?filename=${filename}`,
              };
            }),
          ),
        });
        message.success(msg);
      } else {
        yield put({
          type: 'setPicList',
          payload: [],
        });
        message.error(msg);
      }

      yield put({ type: 'setPicListLoading', payload: false });
    },
  },
  reducers: {
    setPicList(state, { payload }) {
      return {
        ...state,
        picList: payload,
      };
    },
    setPicListLoading(state, { payload }) {
      return {
        ...state,
        picListLoading: payload,
      };
    },
  },
};

export default Model;
