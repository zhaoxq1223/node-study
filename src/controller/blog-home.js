const xss = require("xss");
const { createBlog, getFollowersBlogList } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
const { PAGE_SIZE } = require("../conf/constant");

/**
 * @description: 创建微博所需的数据
 * @param {Object} param0 { userId, content, image }
 */
const create = async ({ userId, content, image }) => {
  try {
    const blog = await createBlog({ userId, content: xss(content), image });
    return new SuccessModel(blog);
  } catch (error) {
    console.error(error.message, error.stack);
    return new ErrorModel(createBlogFailInfo);
  }
};

/**
 * @description: 获取首页微博列表
 * @param {Number} userId
 * @param {Number} pageIndex
 * @return {*}
 */
const getHomeBlogList = async (userId, pageIndex = 0) => {
  const result = await getFollowersBlogList({
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
  create,
  getHomeBlogList,
};
