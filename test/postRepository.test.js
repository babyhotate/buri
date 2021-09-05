const { PostRepository } = require('../repositories/postRepository');
const { Post } = require('../models/post');
const fs = require('fs');

const DATA_DIR_PATH = 'test/data';
const POSTS_FILE_PATH = `${DATA_DIR_PATH}/posts.txt`;

let postRepository;
beforeEach(() => {
    postRepository = new PostRepository(DATA_DIR_PATH);
    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["user1,hoge,1", "user2,fuga,2"].join("\n"));
});

describe('#getPosts', () => {
    test('post全件が取得できる', () => {
        const posts = postRepository.getPosts();
        expect(posts.length).toBe(2);
        expect(posts[0].userId).toBe("user1");
        expect(posts[0].message).toBe("hoge");
        expect(posts[0].id).toBe("1");
        expect(posts[1].userId).toBe("user2");
        expect(posts[1].message).toBe("fuga");
        expect(posts[1].id).toBe("2");
    });
});

describe("#newWritePost", () => {
  test("1件の投稿をデータストアに書き込む", () => {
    postRepository.newWritePost("user1", "piyo");

    let posts = fs.readFileSync(POSTS_FILE_PATH, "utf-8");
    posts = posts.split("\n");
    expect(posts[posts.length - 1]).toBe("user1,piyo,3");
  });
});

describe('#writePost', () => {
    test('1件の投稿をデータストアに書き込む', () => {
        const post = new Post("user1", "piyo");
        postRepository.writePost(post);

        let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
        posts = posts.split("\n");
        expect(posts[posts.length - 1]).toBe("user1,piyo");
    });
});


describe('#deletePost', () => {
    test('1件の投稿を削除する', () => {
        postRepository.deletePost(1);

        let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
        posts = posts.split("\n");

        expect(posts).not.toContain('user2,fuga1,2');
        expect(posts).toContain('user1,hoge,1');
    });
});

describe('#editPost', () => {
    test('1件の投稿を編集する', () => {
        postRepository.editPost(1, 'fuga2');

        let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
        posts = posts.split("\n");

        expect(posts[1]).toBe("user2,fuga2,2");
    });
});
