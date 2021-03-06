const Sequelize = require("sequelize");
const { User, UserRelation } = require("../db/model/index");
const { formatUser } = require("./_format");

/**
 * @description: 获取关注该用户的用户列表，及该用户的粉丝
 * @param {Number} followerId 被关注人的id
 * @return {*}
 */
const getUserByFollower = async (followerId) => {
  const result = await User.findAndCountAll({
    attributes: ["id", "userName", "nickName", "picture"],
    order: [["id", "desc"]],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            [Sequelize.Op.ne]: followerId,
          },
        },
      },
    ],
  });

  let userList = result.rows.map((row) => row.dataValues);
  userList = formatUser(userList);

  return {
    count: result.count,
    userList,
  };
};

/**
 * @description: 获取关注人列表
 * @param {Number} userId
 * @return {*}
 */
const getFollowersByUser = async (userId) => {
  const result = await UserRelation.findAndCountAll({
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["id", "userName", "nickName", "picture"],
      },
    ],
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne]: userId,
      },
    },
  });

  let userList = result.rows.map((row) => row.dataValues);
  userList = userList.map((item) => {
    let user = item.user.dataValues;
    user = formatUser(user);
    return user;
  });

  return {
    count: result.count,
    userList,
  };
};

/**
 * @description: 添加关注关系
 * @param {*} userId 用户id
 * @param {*} followerId 被关注用户id
 */
const addFollower = async (userId, followerId) => {
  const result = await UserRelation.create({
    userId,
    followerId,
  });

  return result.dataValues;
};

/**
 * @description: 删除关注关系
 * @param {Number} userId 用户id
 * @param {Number} followerId 被关注用户id
 */
const deleteFollower = async (userId, followerId) => {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId,
    },
  });
  return result > 0;
};

module.exports = {
  getUserByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser,
};
