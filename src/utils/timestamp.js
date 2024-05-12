'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.utcTimestamp = void 0;
function utcTimestamp() {
  var now = new Date();
  var ms = now.getTime();
  var micro = Math.trunc(Math.random() * 1000);
  var sec = Math.trunc(ms / 1000);
  // 使用秒数部分除以随机的微秒部分，用作毫秒数部分。真实的毫秒数部分被丢弃了
  var msPart = Math.trunc(sec % micro);
  return (sec * 1000 + msPart) * 1000 + micro;
}
exports.utcTimestamp = utcTimestamp;
