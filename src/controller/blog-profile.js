const { getBlogListByUser } = require("../services/blog");
const { PAGE_SIZE } = require("../conf/constant");
const { SuccessModel } = require("../model/ResModel");

/**
 * @description: 获取个人主页微博列表
 * @param {String} userName 用户名
 * @param {Number} pageIndex 当前页面
 */
const getProfileBlogList = async (userName, pageIndex = 0) => {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE,
  });

  const blogList = result.blogList;

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count,
  });
};

module.exports = {
  getProfileBlogList,
};
