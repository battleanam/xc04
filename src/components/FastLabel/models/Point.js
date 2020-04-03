import { Feature } from '@/components/FastLabel/models/Feature';

export class Point extends Feature {

  position = { x: 0, y: 0 };

  constructor(id, position, data, style) {
    super(id, data, style);
    this.position = position;
  }

  render(ctx) {

    if (!this.visible) return; // 不可见的情况不渲染

    // 保存上下文
    ctx.save();

    // 设置画笔样式
    const { fillStyle, pointSize } = this.style;
    ctx.fillStyle = fillStyle;

    // 绘制点
    const { x, y } = this.position;
    ctx.moveTo(x + .5, y + .5);
    ctx.arc(x + .5, y + .5, pointSize, 0, Math.PI * 2, true);

    // 还原上下文
    ctx.restore();
  }

}
