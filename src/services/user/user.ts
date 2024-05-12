import { Profile } from '@/models/user';
import { get, post } from '@/utils/axios';

export function wechatLoginURL() {
  return get<string>('/oauth2/wechat/auth_url');
}

export function validateWechatCode(params: {
  code: string | null;
  state: string | null;
}) {
  return post<Profile>('/oauth2/wechat/callback', params);
}

export function mockLogin() {
  return get<string>('/oauth2/mock/login');
}

export function getProfile() {
  return get<Profile>('/users/profile');
}
