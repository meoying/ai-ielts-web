export function utcTimestamp(): number {
  const now = new Date();
  const ms = now.getTime();
  const micro = Math.trunc(Math.random() * 1000);
  const sec = Math.trunc(ms / 1000);
  // 使用秒数部分除以随机的微秒部分，用作毫秒数部分。真实的毫秒数部分被丢弃了
  const msPart = Math.trunc(sec % micro);
  return (sec * 1000 + msPart) * 1000 + micro;
}
