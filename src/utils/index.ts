import { Profile } from '@/models/user';
import store from 'store';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const USER_INFO_LOCAL_NAME = 'userInfo';
export const THEME_LOCAL_NAME = 'theme';
export type THEME_VALUE = 'drak' | 'algor';

export function isLogin() {
  return store.get(REFRESH_TOKEN);
}
export function getUserInfo(): Profile {
  return store.get(USER_INFO_LOCAL_NAME);
}
export function setUserInfo(p: Profile) {
  store.set(USER_INFO_LOCAL_NAME, p);
}
export function loginOut() {
  store.remove(ACCESS_TOKEN);
  store.remove(USER_INFO_LOCAL_NAME);
  store.remove(REFRESH_TOKEN);
}

export function setTheme(theme: THEME_VALUE) {
  store.set(THEME_LOCAL_NAME, theme);
}
export function getTheme(): THEME_VALUE | null {
  return store.get(THEME_LOCAL_NAME);
}
