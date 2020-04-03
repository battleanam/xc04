import { Feature } from '@/components/FastLabel/models/Feature';

export class Polygon extends Feature {

  points = [];

  constructor(id, points, data, style) {
    super(id, data, style);
    this.points = points;
  }

  render(ctx) {

    if (!this.visible) return; // 不可见的情况不渲染

    // 保存上下文
    ctx.save();

    // 设置画笔样式
    const { strokeStyle, fillStyle, lineWidth } = this.style;
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;

    // 绘制多边形
    const [[x, y], ...other] = this.points;
    ctx.beginPath();
    ctx.moveTo(x + .5, y + .5);
    other.forEach(([x, y]) => {
      ctx.lineTo(x, y);
    });
    ctx.closePath();

    // 还原上下文
    ctx.restore();
  }

}
