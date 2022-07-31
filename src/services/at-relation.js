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

module.exports = {
  createAtRelation,
};
