
const { Post } = require('./post');

test("Postのコンストラクタ", () => {
    const userId = "user1";
    const message = "hoge";
    const post = new Post(userId, message);
    expect(post).toBeInstanceOf(Post);
    expect(post.userId).toBe("user1");
    expect(post.message).toBe("hoge");
});