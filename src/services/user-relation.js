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

module.exports = {
  getUserByFollower,
};
