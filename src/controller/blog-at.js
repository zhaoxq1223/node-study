const { SuccessModel } = require("../model/ResModel");
const { getAtRelationCount } = require("../services/at-relation");

/**
 * @description: 获取 @ 我的微博数量
 * @param {Number} userId
 */
const getAtMeCount = async (userId) => {
  const count = await getAtRelationCount(userId);
  return new SuccessModel({
    count,
  });
};

module.exports = {
  getAtMeCount,
};
