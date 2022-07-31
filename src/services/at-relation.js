const { AtRelation, Blog, User } = require("../db/model/index");
const { formatBlog, formatUser } = require("./_format");

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

/**
 * @description: 获取 @ 用户的微博列表
 * @param {Object} param0
 */
const getAtUserBlogList = async ({ userId, pageIndex, pageSize = 10 }) => {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [["id", "desc"]],
    include: [
      {
        model: AtRelation,
        attributes: ["userId", "blogId"],
        where: { userId },
      },
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
      },
    ],
  });

  let blogList = result.rows.map((row) => row.dataValues);
  blogList = formatBlog(blogList);
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues);
    return blogItem;
  });

  return {
    count: result.count,
    blogList,
  };
};

/**
 * @description: 更新AtRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 * @return {*}
 */
const updateAtRelation = async ({ newIsRead }, { userId, isRead }) => {
  const updateData = {};
  if (newIsRead) {
    updateData.isRead = newIsRead;
  }

  const whereOpt = {};
  if (userId) {
    whereOpt.userId = userId;
  }
  if (isRead) {
    whereOpt.isRead = isRead;
  }

  const result = await AtRelation.update(updateData, {
    where: whereOpt,
  });

  return result[0] > 0;
};

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation,
};
