import request from '@/utils/request';

/**
 * 获取统计原始数据
 * @param userName 用户名
 * @param start 开始时间
 * @param end 结束时间
 * @returns {Promise<any>}
 */
export async function getAnalysisList({ userName, start, end }) {
  return request(window.host + '/Su/GetAnnoList', { method: 'POST', data: { userName, start, end } });
}


/**
 * 获取测报灯图片列表
 * @param sDate 开始时间
 * @param eDate 结束时间
 * @param userName 测报灯编号
 * @returns {Promise<any>}
 */
export async function loadPics(sDate, eDate, userName) {
  return request(window.host + '/Su/Pic', { method: 'GET', params: { sDate, eDate, userName } });
}

/**
 * 获取高清原图
 * @param filename 文件名称
 * @returns {Promise<any>}
 */
export async function getBigPic(filename) {
  return request(window.host + '/Su/GetBigPic', { method: 'GET', params: { filename } });
}

/**
 * 获取缩略图
 * @param filename 文件名称
 * @returns {Promise<any>}
 */
export async function getSmallPic(filename) {
  return request(window.host + '/Su/GetBigPic', { method: 'GET', params: { filename } });
}

/**
 * 获取某个图片上的标注列表
 * @param filename 文件名称
 * @returns {Promise<any>}
 */
export async function getMarks(filename) {
  return request(window.host + '/Su/getAnno', { method: 'POST', data: { filename } });
}

/**
 * 获取标签
 * @param img_name 图片名称
 * @returns {Promise<any>}
 */
export async function sqlSearch(img_name) {
  return request(window.host + `/img/sql_search?img_name=${img_name}`, { method: 'GET'});
}
