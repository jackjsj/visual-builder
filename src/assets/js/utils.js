// 不显示$开头的字段
export function toJSON(obj) {
  return Object.keys(obj).reduce((prev, next) => {
    if (!next.startsWith('$')) {
      prev[next] = obj[next];
    }
    return prev;
  }, {});
}
