const server = require("../server");
const { L_COOKIE, Z_COOKIE } = require("../testUserInfo");

// 存储微博id
let BLOG_ID = "";

test("创建一条微博，应该成功", async () => {
  const content = "单元测试自动创建微博_" + Date.now();
  const image = "/xxx.png";

  const res = await server
    .post("/api/blog/create")
    .send({
      content,
      image,
    })
    .set("cookie", L_COOKIE);

  expect(res.body.errno).toBe(0);
  expect(res.body.data.content).toBe(content);
  expect(res.body.data.image).toBe(image);

  BLOG_ID = res.body.data.id;
});

// 加载第一页数据
test("首页，加载第一页数据", async () => {
  const res = await server.get(`/api/blog/loadMore/0`).set("cookie", Z_COOKIE); // 设置 cookie
  expect(res.body.errno).toBe(0);
  const data = res.body.data;
  expect(data).toHaveProperty("isEmpty");
  expect(data).toHaveProperty("blogList");
  expect(data).toHaveProperty("pageSize");
  expect(data).toHaveProperty("pageIndex");
  expect(data).toHaveProperty("count");
});
