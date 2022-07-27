const { DEFAULT_PICTURE } = require("../conf/constant");
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
 * @description: 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 * @return {Array|Object}
 */
const formatBlog = (list) => {
  if (list == null) {
    return list;
  }
  if (list instanceof Array) {
    return list.map(_formatDBTime);
  }

  return _formatDBTime(list);
};

module.exports = {
  formatUser,
  formatBlog,
};
