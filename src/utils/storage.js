/**
 * 本地存储sessionStorage
 * @param {string} key
 * @param {Params} value
 */
export function setStorageSess(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}
export function getStorageSess(key) {
  return JSON.parse(window.sessionStorage.getItem(key)) || undefined;
}
