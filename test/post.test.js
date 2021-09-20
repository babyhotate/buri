
const { Post } = require('../models/post');

test("Postのコンストラクタ", () => {
    const userId = "user1";
    const message = "hoge";
    const postId = "1";
    const post = new Post(userId, message, postId);
    expect(post).toBeInstanceOf(Post);
    expect(post.userId).toBe("user1");
    expect(post.message).toBe("hoge");
    expect(post.id).toBe("1");
});