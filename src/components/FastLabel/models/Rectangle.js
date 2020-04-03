import { Feature } from '@/components/FastLabel/models/Feature';
import * as MathHelper from '@/components/FastLabel/helper/MathHelper';

export class Rectangle extends Feature {

  rect = { x: 0, y: 0, w: 0, h: 0 };

  constructor(id, rect, data, style) {
    super(id, data, style);
    this.rect = rect;
  }

  /**
   * 是否包含某个点
   * @param x {number}
   * @param y {number}
   * @returns {boolean}
   */
  hasPoint({ x, y }) {
    const { rect: { x: x1, y: y1, w, h } } = this;
    const x2 = x1 + w, y2 = y1 + h;
    return MathHelper.between(x, x1, x2) && MathHelper.between(y, y1, y2);
  }

  render(ctx) {
    if (!this.visible) return; // 不可见的情况不渲染

    // 保存上下文
    ctx.save();

    // 设置画笔样式
    const { strokeStyle, lineWidth } = this.style;
    ctx.fillStyle = 'transparent';
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

    // 绘制矩形
    const { x, y, w, h } = this.rect;
    ctx.moveTo(x + .5, y + .5);
    ctx.rect(x + .5, y + .5, w, h);
    ctx.stroke();

    // 还原上下文
    ctx.restore();
  }

}
