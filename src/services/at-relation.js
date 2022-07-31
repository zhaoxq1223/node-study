const { AtRelation } = require("../db/model/index");

/**
 * @description: 创建微博 @ 用户的关系
 * @param {Number} blogId 微博id
 * @param {Number} userId 用户id
 */
const createAtRelation = async (blogId, userId) => {
  const result = await AtRelation.create({
    blogId,
    userId,
  });

  return result.dataValues;
};

/**
 * @description: 获取 @ 用户的微博数量
 * @param {Number} userId
 * @return {*}
 */
const getAtRelationCount = async (userId) => {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false,
    },
  });

  return result.count;
};

module.exports = {
  createAtRelation,
  getAtRelationCount,
};
