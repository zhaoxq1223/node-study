const { Blog, User, UserRelation } = require("../db/model/index");
const { formatUser, formatBlog } = require("./_format");

/**
 * @description: 创建微博数据
 * @param {Object} param0 { userId, content, image }
 */
const createBlog = async ({ userId, content, image }) => {
  const result = await Blog.create({
    userId,
    content,
    image,
  });
  return result.dataValues;
};

/**
 * @description: 根据用户获取微博列表
 * @param {Object} param0 查询参数 { userName, pageIndex = 0, pageSize = 10 }
 */
const getBlogListByUser = async ({
  userName,
  pageIndex = 0,
  pageSize = 10,
}) => {
  const userWhereOpts = {};
  if (userName) {
    userWhereOpts.userName = userName;
  }

  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
        where: userWhereOpts,
      },
    ],
  });

  let blogList = result.rows.map((row) => row.dataValues);

  blogList = formatBlog(blogList);

  blogList = blogList.map((blogItem) => {
    const user = blogItem.user.dataValues;
    blogItem.user = formatUser(user);
    return blogItem;
  });

  return {
    count: result.count,
    blogList,
  };
};

/**
 * @description: 获取关注者的微博列表
 * @param {Object} param0
 */
const getFollowersBlogList = async ({
  userId,
  pageIndex = 0,
  pageSize = 10,
}) => {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
      },
      {
        model: UserRelation,
        attributes: ["userId", "followerId"],
        where: { userId },
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

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList,
};
