const { Blog } = require("../../src/db/model/index");

test("微博数据模型的各个属性，符合预期", () => {
  // build 会构建一个内存的 Blog 实例，但不会提交数据库
  const blog = Blog.build({
    userId: 1,
    content: "微博内容",
    image: "/test.png",
  });

  // 验证各个属性
  expect(blog.userId).toBe(1);
  expect(blog.content).toBe("微博内容");
  expect(blog.image).toBe("/test.png");
});
