const { getUserInfo, createUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
} = require("../model/ErrorInfo");
const doCrypto = require("../utils/cryp");

/**
 * @description: 用户名是否存在
 * @param {String} userName
 */
const isExist = async (userName) => {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
};

/**
 * @description: 注册
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别（1 男，2 女，3 保密）
 */
const register = async ({ userName, password, gender }) => {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }

  try {
    await createUser({ userName, password: doCrypto(password), gender });

    return new SuccessModel();
  } catch (error) {
    console.error(error.message, error.stack);
    return new ErrorModel(registerFailInfo);
  }
};

module.exports = {
  isExist,
  register,
};