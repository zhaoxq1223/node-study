const { User } = require("../db/model/index");
const { formatUser } = require("./_format");

/**
 * @description: 获取用户信息
 * @param {String} userName
 * @param {String} password
 * @return {*}
 */
const getUserInfo = async (userName, password) => {
  // 查询条件
  const whereOpt = {
    userName,
  };
  if (password) Object.assign(whereOpt, { password });

  // 查询
  const result = await User.findOne({
    attributes: ["id", "userName", "nickName", "picture", "city"],
    where: whereOpt,
  });

  if (result == null) return result;

  const fornatRes = formatUser(result.dataValues);

  return fornatRes;
};

module.exports = {
  getUserInfo,
};
