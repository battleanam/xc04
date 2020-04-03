export class Feature {
  id = ''; // 唯一标识
  data = {}; // 附带数据
  style = {
    strokeStyle: 'red', // 线条样式
    fillStyle: 'transparent', // 填充样式
    lineWidth: 1, // 线条宽度
    pointSize: 12, // 点的半径
  };
  visible = true; // 是否可见

  constructor(id, data, style) {
    this.id = id;
    this.data = data;
    this.style = style;
  }
}
