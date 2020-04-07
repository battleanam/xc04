import { message } from 'antd';
import { loadPics, getMarks } from '@/pages/Home/service';
import { reduce } from 'lodash';
import moment from 'moment';

/**
 * 将图片上的标注框按虫种类别进行分类统计
 * @param marks 标注框列表
 * @param styles 标注样式字典
 * @returns {unknown[]}
 */
function analysis(marks, styles) {
  const obj = reduce(marks, (result, mark) => {
    const { label } = mark;
    return {
      ...result,
      [label]: {
        ...mark,
        count: +result[label] + 1,
        ...styles[label],
      },
    };
  });
  return Reflect.ownKeys(obj).map(key => ({
    ...obj[key],
  }));
}

const Model = {
  namespace: 'home',
  state: {
    navigatorVisible: false, // 是否展示返回主页按钮
    dateUnit: 'month', // 选择时间范围时日期的单位 month | day
    dateRange: [moment('2019-08-01')], // 时间范围
    picList: [], // 测报灯图像列表
    picListLoading: false, // 测报灯图像列表加载状态
    viewLength: 1, // 显示图片的数量
    analysisList: [], // 对于一张图片的统计数据
    analysisLoading: false, // 统计数据加载状态
    imgList: [], // 当前加载的图像列表 存放 Image Dom Entity
    deviceId: '69060502', // 设备编号
    deviceList: [], // 设备列表
  },
  effects: {
    * getPicList({ sDate, eDate, userName }, { put, call }) {
      yield put({ type: 'setPicListLoading', payload: true });
      const {
        Code, data, msg,
      } = yield call(
        loadPics,
        sDate.format('YYYY-MM-DD'),
        eDate.format('YYYY-MM-DD'),
        userName,
      );
      if (Code === 1000) {
        const picList = JSON.parse(data);
        yield put({
          type: 'setPicList',
          payload: picList.map(pic => {
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
        });
        message.success(msg);
      } else {
        message.error(msg);
      }
      yield put({ type: 'setPicListLoading', payload: false });
    },
    * getMarks({ filename, styles }, { put, call }) {
      yield put({ type: 'setAnalysisLoading', payload: true });
      const { Code, data } = yield call(getMarks, filename);
      if (Code === 1000) {
        const { anno: { shapes } } = JSON.parse(data);
        yield put({ type: 'setAnalysisList', payload: analysis(shapes, styles) });
      } else {
        yield put({ type: 'setAnalysisList', payload: [] });
      }
      yield put({ type: 'setAnalysisLoading', payload: false });
    },
  },
  reducers: {
    setNavigatorVisible(state, { payload }) {
      return {
        ...state,
        navigatorVisible: payload,
      };
    },
    setDateUnit(state, { payload }) {
      let { dateRange: [start, end] } = state;

      if (payload === 'month') {
        const now = moment(start);
        now.startOf('M');
        start = moment(now);
        now.endOf('M');
        end = moment(now);
      }

      return {
        ...state,
        dateUnit: payload,
        dateRange: [start, end],
      };
    },
    setDateRange(state, { payload }) {
      return {
        ...state,
        dateRange: payload,
      };
    },
    setPicList(state, { payload }) {
      return {
        ...state,
        picList: payload,
        viewLength: 1,
      };
    },
    setPicListLoading(state, { payload }) {
      return {
        ...state,
        picListLoading: payload,
      };
    },
    setAnalysisList(state, { payload }) {
      return {
        ...state,
        analysisList: payload,
      };
    },
    setAnalysisLoading(state, { payload }) {
      return {
        ...state,
        analysisLoading: payload,
      };
    },
    setViewLength(state, { payload }) {
      return {
        ...state,
        viewLength: payload,
      };
    },
    setImgList(state, { payload }) {
      return {
        ...state,
        imgList: payload,
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
    setDeviceId(state, { payload }) {
      return {
        ...state,
        deviceId: payload,
      };
    },
  },
};

export default Model;
