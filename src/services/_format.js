const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require("../conf/constant");
const { timeFormat } = require("../utils/dt");

/**
 * @description:用户默认头像
 * @param {Object} obj 用户对象
 * @return {Object}
 */
const _formatUserPicture = (obj) => {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
};

/**
 * @description: 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 * @return {Array|Object}
 */
const formatUser = (list) => {
  if (list == null) return list;

  if (list instanceof Array) {
    return list.map(_formatUserPicture);
  }

  return _formatUserPicture(list);
};

/**
 * @description: 格式化数据时间
 * @param {Object} obj
 */
const _formatDBTime = (obj) => {
  obj.createdAtFormat = timeFormat(obj.createdAt);
  obj.updatedAtFormat = timeFormat(obj.updatedAt);
  return obj;
};

/**
 * @description: 格式化微博内容
 * @param {Object} obj
 */
const _formatContent = (obj) => {
  obj.contentFormat = obj.content;

  // 格式化 @
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`;
    }
  );

  return obj;
};

/**
 * @description: 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 * @return {Array|Object}
 */
const formatBlog = (list) => {
  if (list == null) {
    return list;
  }
  if (list instanceof Array) {
    return list.map(_formatDBTime).map(_formatContent);
  }

  let result = list;
  result = _formatDBTime(result);
  result = _formatContent(result);

  return result;
};

module.exports = {
  formatUser,
  formatBlog,
};
