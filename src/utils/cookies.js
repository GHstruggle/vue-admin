import cookie from 'cookie_js';

const TO_KEN = 'token';
const USER_NAME = 'username';
export function setToken(value) {
  cookie.set(TO_KEN, value);
}
export function getToken() {
  return cookie.get(TO_KEN);
}
export function setUserName(value) {
  cookie.set(USER_NAME, value);
}
export function getUserName() {
  return cookie.get(USER_NAME);
}

export function removeUserName() {
  cookie.remove(USER_NAME);
}
export function removetoKen() {
  cookie.remove(TO_KEN);
}
