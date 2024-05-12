// 微信扫码登录回调页面
import { validateWechatCode } from '@/services/user/user';
import { ACCESS_TOKEN, REFRESH_TOKEN, setUserInfo } from '@/utils';
import { history } from '@@/core/history';
import { AxiosHeaders } from 'axios';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import store from 'store';

const Page: React.FC = () => {
  const [params] = useSearchParams();
  const code = params.get('code')!;
  const state = params.get('state')!;
  validateWechatCode({ code: code, state: state }).then((res) => {
    const data = res?.data;
    if (data?.code === 0) {
      const profile = data.data;
      setUserInfo(profile);
      const headers = res.headers as AxiosHeaders;
      const newToken = headers.get('X-Access-Token');
      const newRefreshToken = headers.get('X-Refresh-Token');
      store.set(ACCESS_TOKEN, newToken);
      store.set(REFRESH_TOKEN, newRefreshToken);
    } else {
      alert('登录失败，请重试');
    }
    history.push('/');
    location.reload();
  });
  return <></>;
};
export default Page;
