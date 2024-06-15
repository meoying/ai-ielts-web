import { Profile } from '@/models/user';
import store from 'store';

export const USER_INFO_LOCAL_NAME = 'userInfo';
export const LOGIN = 'login';
export const THEME_LOCAL_NAME = 'theme';
export type THEME_VALUE = 'drak' | 'algor';

export function isLogin() {
  return store.get(LOGIN)
}

export function markLogin() {
  store.set(LOGIN, true)
}

export function getUserInfo(): Profile {
  return store.get(USER_INFO_LOCAL_NAME) || {};
}
export function setUserInfo(p: Profile) {
  store.set(USER_INFO_LOCAL_NAME, p);
}

export function logout() {
  store.remove(USER_INFO_LOCAL_NAME);
  store.remove(LOGIN);
}

export function setTheme(theme: THEME_VALUE) {
  store.set(THEME_LOCAL_NAME, theme);
}
export function getTheme(): THEME_VALUE | null {
  return store.get(THEME_LOCAL_NAME);
}
