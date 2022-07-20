const { ErrorModel } = require("../model/ResModel");
const { jsonSchemaFileInfo } = require("../model/ErrorInfo");

/**
 * @description:生成 json schema 验证的中间件
 * @param {Function} validateFn
 * @return {Function}
 */
const genValidator = (validateFn) => {
  // 定义中间件函数
  const validator = async (ctx, next) => {
    const data = ctx.request.body;
    const error = validateFn(data);
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return;
    }

    await next();
  };
  // 返回中间件
  return validator;
};

module.exports = {
  genValidator,
};
