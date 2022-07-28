const { PAGE_SIZE } = require("../conf/constant");
const { getSquareCacheList } = require("../cache/blog");
const { SuccessModel } = require("../model/ResModel");

const getSquareBlogList = async (pageIndex = 0) => {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE);
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
  getSquareBlogList,
};
