const { getUserByFollower } = require("../services/user-relation");
const { SuccessModel } = require("../model/ResModel");

/**
 * @description: 根据userId获取粉丝列表
 * @param {Number} userId 用户id
 */
const getFans = async (userId) => {
  const { count, userList } = await getUserByFollower(userId);

  return new SuccessModel({
    count,
    fansList: userList,
  });
};

module.exports = {
  getFans,
};
