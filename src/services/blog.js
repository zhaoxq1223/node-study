const { Blog } = require("../db/model/index");

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

module.exports = {
  createBlog,
};
