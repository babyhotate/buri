const { Post } = require("../models/post");

test("Postのコンストラクタ", () => {
  const post = new Post({ userId: "user1", message: "hoge", id: 1 });
  expect(post).toBeInstanceOf(Post);
  expect(post.userId).toBe("user1");
  expect(post.message).toBe("hoge");
  expect(post.id).toBe(1);
});
