import { ACCESS_TOKEN, loginOut, REFRESH_TOKEN } from '@/utils/index';
import { message } from 'antd';
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from 'store';
import { utcTimestamp } from './timestamp.min';

// const baseURL = '/api/'; //
const baseURL = process.env.BASE_URL || 'http://localhost:8080';
export interface Result<T> {
  code: number;
  msg: string;
  data: T;
}

const instance = axios.create({
  // 这边记得修改你对应的配置文件
  baseURL: baseURL,
  withCredentials: true,
});

function replaceTokenIfNecessary(resp: AxiosResponse) {
  // 不知道为啥，但是得这么写
  const newToken =
    resp.headers['X-Access-Token'] || resp.headers['x-access-token'];
  const newRefreshToken =
    resp.headers['X-Refresh-Token'] || resp.headers['x-refresh-token'];
  if (newToken) {
    store.set(ACCESS_TOKEN, newToken);
  }
  if (newRefreshToken) {
    store.set(REFRESH_TOKEN, newRefreshToken);
  }
  return resp;
}

instance.interceptors.response.use(
  (resp) => {
    replaceTokenIfNecessary(resp);
    return resp;
  },
  (err) => {
    const status = err?.response?.status || 500;
    if (status == 401) {
      // 短 token 已经过期了
      // 尝试用长 token 重新换一个
      const token = store.get(REFRESH_TOKEN);
      const cfg = err.config;
      const from401 = cfg?._from401;
      if (!from401 && token) {
        const header = new AxiosHeaders();
        header.setAuthorization('Bearer ' + token, true);
        header.set('X-Timestamp', utcTimestamp());
        axios
          .post(
            baseURL + '/oauth2/wechat/token/refresh',
            {},
            {
              headers: header,
            },
          )
          .then((res) => {
            replaceTokenIfNecessary(res);
          })
          .catch((err) => {
            console.log('刷新登录态失败', err);
          })
          .finally(() => {
            // 即便是刷新失败，也可能是因为并发导致的，所以继续重试
            cfg._from401 = true;
            cfg.headers.setAuthorization(
              'Bearer ' + store.get(ACCESS_TOKEN),
              true,
            );
            instance(cfg);
          });
        return;
      } else {
        loginOut();
      }
    }
    if (status == 401) {
      message.error('请登录!', 3);
    } else if (status == 403) {
      message.error('请购买会员!', 3);
    } else {
      message.error('系统错误: ' + status, 3);
      console.log(err);
    }
  },
);

// 在这里让每一个请求都加上 authorization 的头部
// 注意，这里每一次修改，都要考虑 401 刷新 token 的时候，也要做对应的修改。
instance.interceptors.request.use(
  (req) => {
    const token = store.get(ACCESS_TOKEN);
    req?.headers?.setAuthorization('Bearer ' + token, true);
    // 加上时间戳
    req?.headers?.set('X-Timestamp', utcTimestamp());
    return req;
  },
  (err) => {
    console.log(err);
  },
);

export function get<T>(url: string, cfg?: AxiosRequestConfig) {
  return instance.get<Result<T>>(url, cfg);
}

export function post<T>(url: string, data?: any, cfg?: AxiosRequestConfig) {
  return instance.post<Result<T>>(url, data, cfg);
}
