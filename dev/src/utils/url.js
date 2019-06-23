/**
 * 获取url的query值
 */
export function getQueryValue(key) {
  var url = document.location.search;
  var reg = new RegExp('(^|&|\\?|#)' + key + '=([^&#]*)(&|\x24|#)', '');
  var match = url.match(reg);
  if (match) {
    return match[2];
  }
  return null;
}
