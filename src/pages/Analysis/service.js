import request from '@/utils/request';

/**
 * 根据测报灯编号获取所有图片上的标注信息
 * @param station_id
 * @returns {Promise<any>}
 */
export async function searchByStation(station_id) {
  return request(window.host + '/img/search_by_station', { method: 'GET', params: { station_id } });
}
