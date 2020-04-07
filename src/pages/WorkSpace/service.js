import request from '@/utils/request';

/**
 * 获取某张图片上的害虫轮廓列表
 * @param img_name 图片文件名称
 * @returns {Promise<any>}
 */
export async function loadShapes(img_name) {
  return request(window.host + `/img/sql_search?img_name=${img_name}`, { method: 'GET' });
}
