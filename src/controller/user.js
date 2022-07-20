const { getUserInfo } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { registerUserNameNotExistInfo } = require("../model/ErrorInfo");

/**
 * @description: 用户名是否存在
 * @param {String} userName
 * @return {Boolean}
 */
const isExist = async (userName) => {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
};

module.exports = {
  isExist,
};
