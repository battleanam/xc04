import request from '@/utils/request';

/**
 * 获取某张图片上的害虫轮廓列表
 * @param img_name 图片文件名称
 * @returns {Promise<any>}
 */
export async function loadShapes(img_name) {
  return request(window.host + `/img/sql_search?img_name=${img_name}`, { method: 'GET' });
}

/**
 * 保存某张图片上的标注信息
 * @param img_name 图片名称
 * @param station_id 测报灯编号
 * @param anno_info 标注信息
 * @returns {Promise<any>}
 */
export async function saveShapes(img_name, station_id, anno_info) {
  return request(window.host + '/img/sql_update', {
    method: 'POST',
    data: { img_name, station_id, anno_info: JSON.stringify(anno_info) },
  });
}
