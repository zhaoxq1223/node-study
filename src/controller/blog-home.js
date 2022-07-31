const xss = require("xss");
const { createBlog, getFollowersBlogList } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
const { PAGE_SIZE, REG_FOR_AT_WHO } = require("../conf/constant");
const { getUserInfo } = require("../services/user");
const { createAtRelation } = require("../services/at-relation");

/**
 * @description: 创建微博所需的数据
 * @param {Object} param0 { userId, content, image }
 */
const create = async ({ userId, content, image }) => {
  // 分析并收集 content 中的 @ 用户
  const atUserNameList = [];
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    atUserNameList.push(userName);
    return matchStr; //替换不生效
  });

  // 根据 @ 用户名查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map((userName) => getUserInfo(userName))
  );

  // 根据用户信息，获取用户id
  const atUserIdList = atUserList.map((user) => user.id);

  try {
    // 创建博客
    const blog = await createBlog({ userId, content: xss(content), image });

    // 创建@关系
    await Promise.all(
      atUserIdList.map((userId) => createAtRelation(blog.id, userId))
    );

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
