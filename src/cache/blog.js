const { get, set } = require("./_redis");
const { getBlogListByUser } = require("../services/blog");

const KEY_PREFIX = "weibo:square";

/**
 * @description: 获取广场列表的缓存
 * @param {*} pageIndex
 * @param {*} pageSize
 */
const getSquareCacheList = async (pageIndex, pageSize) => {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;

  // 尝试获取缓存
  const cacheResult = await get(key);
  if (cacheResult != null) {
    return cacheResult;
  }

  // 没有缓存，则读取数据库
  const result = await getBlogListByUser({ pageIndex, pageSize });

  // 设置缓存
  set(key, result, 60);

  return result;
};

module.exports = {
  getSquareCacheList,
};
