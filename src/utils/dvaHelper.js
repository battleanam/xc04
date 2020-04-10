/**
 * 处理延时操作
 * @param ms 延时时间 毫秒计
 * @returns {Promise<unknown>}
 */
export const delay = ms => new Promise((resolve) => {
  const timer = setTimeout(() => {
    resolve(timer);
  }, ms);
});
