import moment from 'moment';

const Model = {
  namespace: 'spore',
  state: {
    logs: [], // 设备运行日志
    sporeId: '', // 设备ID
    picList: [], // 设备图像列表
    currentPic: -1, // 当前图片
    startUpTime: moment(), // 启动时间
    glueSprayingTime: moment(), // 喷胶时间
    adsorbTime: moment(), // 鼓风时间 开始吸附孢子的时间
    speed: 4, // 摄像头移动速度
    status: 1, // 设备状态
    workInterval: 3, // 工作时间间隔 每x小时

  },
  reducers: {},
};

export default Model;
