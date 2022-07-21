const { ErrorModel } = require("../model/ResModel");
const { loginCheckFailInfo } = require("../model/ErrorInfo");

/**
 * @description: API 登录验证
 * @param {Object} ctx
 * @param {Function} next
 */
const loginCheck = (ctx, next) => {
  // 已登录
  if (ctx.session?.userInfo) {
    await next()
    return
  }

  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
};

/**
 * @description: 页面 登录验证
 * @param {Object} ctx
 * @param {Function} next
 */
const loginRedirect = (ctx, next) => {
  // 已登录
  if (ctx.session?.userInfo) {
    await next()
    return
  }

  // 未登录
  const curUrl = ctx.url
  ctx.redirect(`/login?url=${encodeURIComponent(curUrl)}`)
};

module.exports = {
  loginCheck,
  loginRedirect,
};
