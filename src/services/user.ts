import { Profile } from '@/models/user';
import { get, post } from '@/utils/axios';

export function wechatLoginURL() {
  return get<string>('/oauth2/wechat/auth_url');
}

export function getProfile() {
  return get<Profile>('/users/profile');
}

export function signup(vals: {email: string, password: string, confirmPws: string}) {
  return post<string>('/users/signup', vals)
}

export function login(vals: {email:string, password: string}) {
  return post<string>('/users/login', vals)
}