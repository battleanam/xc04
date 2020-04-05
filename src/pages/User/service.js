import request from '@/utils/request';

/**
 * 处理登录请求
 * @param username 登录用户名
 * @param password 登录密码
 * @returns {Promise<any>}
 */
export async function login(username, password) {
  return request('/Su/login', {
    method: 'POST',
    data: {
      loginUserName: username,
      loginPwd: password,
    },
  });
}
