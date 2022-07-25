const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
} = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
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

/**
 * @description:登录
 * @param {Object} ctx koa2
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
const login = async (ctx, userName, password) => {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    return new ErrorModel(loginFailInfo);
  }

  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
};

/**
 * @description: 删除当前用户
 * @param {*} userName 用户名
 */
const delectCurUser = async (userName) => {
  const result = deleteUser(userName);
  if (result) {
    return new SuccessModel();
  }

  return new ErrorModel(deleteUserFailInfo);
};

/**
 * @description: 修改个人信息
 * @param {Object} ctx
 * @param {String} nickName 昵称
 * @param {String} city 城市
 * @param {String} picture 头像
 */
const changeInfo = async (ctx, { nickName, city, picture }) => {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }

  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture,
    },
    { userName }
  );

  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture,
    });

    return new SuccessModel();
  }

  return new ErrorModel(changeInfoFailInfo);
};

/**
 * @description: 修改密码
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {String} newPassword 新密码
 */
const changePassword = async (userName, password, newPassword) => {
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    {
      userName,
      password: doCrypto(password),
    }
  );

  if (result) {
    return new SuccessModel();
  }

  return new ErrorModel(changePasswordFailInfo);
};

/**
 * @description: 退出登录
 * @param {Object} ctx
 */
const logout = async (ctx) => {
  delete ctx.session.userInfo;
  return new SuccessModel();
};

module.exports = {
  isExist,
  register,
  login,
  delectCurUser,
  changeInfo,
  changePassword,
  logout,
};
