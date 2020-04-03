import request from '@/utils/request';

/**
 * 获取统计原始数据
 * @param userName 用户名
 * @param start 开始时间
 * @param end 结束时间
 * @returns {Promise<any>}
 */
export async function getAnalysisList({ userName, start, end }) {
  return request('/Su/GetAnnoList', { method: 'POST', data: { userName, start, end } });
}


/**
 * 获取测报灯图片列表
 * @param sDate 开始时间
 * @param eDate 结束时间
 * @param userName 测报灯编号
 * @returns {Promise<any>}
 */
export async function loadPics(sDate, eDate, userName) {
  return request('/Su/Pic', { method: 'GET', params: { sDate, eDate, userName } });
}

/**
 * 获取高清原图
 * @param filename 文件名称
 * @returns {Promise<any>}
 */
export async function getBigPic(filename) {
  return request('/Su/GetBigPic', { method: 'GET', params: { filename } });
}

/**
 * 获取缩略图
 * @param filename 文件名称
 * @returns {Promise<any>}
 */
export async function getSmallPic(filename) {
  return request('/Su/GetBigPic', { method: 'GET', params: { filename } });
}

/**
 * 获取某个图片上的标注列表
 * @param filename 文件名称
 * @returns {Promise<any>}
 */
export async function getMarks(filename) {
  return request('/Su/getAnno', { method: 'POST', data: { filename } });
}
