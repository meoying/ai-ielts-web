import { Profile } from '@/models/user';
import { getProfile } from '@/services/user';
import {
  THEME_VALUE,
  getTheme,
  getUserInfo,
  isLogin,
  setUserInfo,
} from '@/utils';
import type { RequestConfig,  RunTimeLayoutConfig, RuntimeAntdConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { theme } from 'antd';
import './global.less';
import HeaderRight from '@/components/HeaderRight';
// import HeaderRight from './components/HeaderRight';

// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  name: string;
  userInfo?: Profile;
  theme: THEME_VALUE;
}> {
  const theme = getTheme() || 'algor';
  if (isLogin()) {
    const resp = await getProfile();
    const p = resp?.data?.data;
    if (p) {
      setUserInfo(p);
    }
  }
  return { name: 'AI-IELTS', userInfo: getUserInfo(), theme };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  // console.log("initialState",initialState)
  return {
    title: 'AI-IELTS',
    // logo: 'https://cdn.meoying.com/interview/logo/logo.png',
    menu: {
      locale: false,
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userid: initialState?.userInfo?.id,
      },

    },
    contentStyle: {
      backgroundColor: '#FFF',
    },
    layout: 'top',
    // logout(initialState) {
    //   console.log('initialState', initialState);
    //   return service.LoginController.logout({ system_source: 'cat' });
    // },
    rightRender(initialState, setInitialState, runtimeConfig) {
      return HeaderRight({});
    },

    // menuRender(props, defaultDom) {
      // return rightMenuLayout({ renderDom: defaultDom, data: props });
    // },
  };
};


const BASE_URL = '/';
export const request: RequestConfig = {
  timeout: 50000,
  baseURL: BASE_URL,
  requestInterceptors: [],
  responseInterceptors: [],
};

export function onRouteChange({ clientRoutes, location }) {
}

export const antd: RuntimeAntdConfig = (memo) => {
  memo.theme ??= {};
  const themeType = getTheme() || 'algor';
  memo.theme.algorithm = [
    themeType === 'drak' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  ]; // 配置 antd5 的预设 dark 算法
  // memo.appConfig = {
  //   message: {
  //     // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
  //     maxCount: 3,
  //   },

  // }

  return memo;
};
