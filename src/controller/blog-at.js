const { PAGE_SIZE } = require("../conf/constant");
const { SuccessModel } = require("../model/ResModel");
const {
  getAtRelationCount,
  getAtUserBlogList,
} = require("../services/at-relation");

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

/**
 * @description: 获取 @ 用户的微博列表
 * @param {Number} userId
 * @param {Number} pageIndex
 */
const getAtMeBlogList = async (userId, pageIndex = 0) => {
  const result = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE,
  });

  const { count, blogList } = result;

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
  });
};

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
};
