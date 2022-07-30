const {
  getUserByFollower,
  addFollower,
  deleteFollower,
} = require("../services/user-relation");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require("../model/ErrorInfo");

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

/**
 * @description: 关注
 * @param {Number} myUserId 当前登录的用户id
 * @param {Number} curUserId 要被关注的用户id
 */
const follow = async (myUserId, curUserId) => {
  try {
    await addFollower(myUserId, curUserId);
    return new SuccessModel();
  } catch (error) {
    console.error(error);
    return new ErrorModel(addFollowerFailInfo);
  }
};

/**
 * @description: 取消关注
 * @param {Number} myUserId
 * @param {Number} curUserId
 */
const unFollow = async (myUserId, curUserId) => {
  const result = await deleteFollower(myUserId, curUserId);
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(deleteFollowerFailInfo);
};

module.exports = {
  getFans,
  follow,
  unFollow,
};
