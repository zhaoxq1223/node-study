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

/**
 * @description: 创建用户
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别
 * @param {String} nickName 昵称
 */
const createUser = async ({ userName, password, gender = 3, nickName }) => {
  const result = await User.create({
    userName,
    password,
    nickName: nickName || userName,
    gender,
  });

  return result.dataValues;
};

/**
 * @description: 删除用户
 * @param {*} userName 用户名
 */
const deleteUser = async (userName) => {
  const result = await User.destroy({
    where: {
      userName,
    },
  });

  // 删除的行数
  return result > 0;
};

/**
 * @description: 更新用户信息
 * @param {Object} param0 要修改的内容
 * @param {Object} param1 查询条件
 */
const updateUser = async (
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) => {
  const updateData = {};
  // 拼接修改内容
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newCity) {
    updateData.city = newCity;
  }

  // 拼接查询条件
  const whereData = {
    userName,
  };
  if (password) {
    whereData.password = password;
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData,
  });

  return result[0] > 0;
};

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
};
