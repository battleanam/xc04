import request from '@/utils/request';
import { reduce } from 'lodash';

/**
 * 获取害虫类型列表
 * @returns {Promise<any>}
 */
export async function getBugTypes() {
  return request('/Su/getBugs', { method: 'GET' });
}

/**
 * 添加一个害虫类型
 * @param keyid 唯一标识
 * @param bugName 害虫名称
 * @param url 图示路径
 * @param color 标注框颜色
 * @param weight 标注框粗细
 * @returns {Promise<never>}
 */
export async function addBugType({ keyid, bugName, url, color, weight }) {
  return request('/Su/addBugs', { method: 'POST', data: { keyid, bugName, url, color, weight } });
}

/**
 * 修改一个害虫类型
 * @param keyid 要修改的害虫的唯一标识
 * @param bugName 害虫名称
 * @param url 图示路径
 * @param color 标注框颜色
 * @param weight 标注框粗细
 * @returns {Promise<never>}
 */
export async function updateBugType({ keyid, bugName, url, color, weight }) {
  return request('/Su/upBugs', { method: 'POST', data: { keyid, bugName, url, color, weight } });
}

/**
 * 删除一个害虫类型
 * @param keyid 要删除的害虫类型的唯一标识
 * @returns {Promise<any>}
 */
export async function deleteBugType(keyid) {
  return request('/Su/deleteBugName', { method: 'GET', params: { keyid } });
}

export async function getBugImgUrlMap() {
  const urlHost = 'http://124.128.96.67:9099/',
    keyName = 'description',
    valueName = 'attachment';
  return request('/Su/getBugImg').then(res => {
    const { Code, data, message } = res;
    if (Code === 1000) {
      return {
        Code,
        data: arrayToMap(data, keyName, valueName, urlHost),
        message
      };
    }
    return res;
  });

}

function arrayToMap(array, keyName, valueName, valueSuffix) {
  return reduce(array, (obj, item) => {
    const key = item[keyName];
    obj[key] = valueSuffix + item[valueName];
    return obj;
  }, {});
}

