const { DEFAULT_PICTURE } = require("../conf/constant");

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

module.exports = {
  formatUser,
};
