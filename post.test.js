
const { Post } = require('./post');

const fs = require("fs");
const DATA_DIR_PATH = 'test/data';
const POSTS_FILE_PATH = `${DATA_DIR_PATH}/posts.txt`;

let post;

beforeEach(() => {
    post = new Post(DATA_DIR_PATH);
    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n"));
});


test('getPostsのテスト', () => {
    const posts = post.getPosts();
    expect(posts.length).toBe(2);
    expect(posts[0]).toBe("hoge");
    expect(posts[1]).toBe("fuga");
});

test('writePostのテスト', () => {
    post.writePost("piyo");

    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n");

    expect(posts[posts.length - 1]).toBe("piyo");
});

test('deletePostのテスト', () => {
    post.deletePost(1);

    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n");

    expect(posts).not.toContain('fuga');
    expect(posts).toContain('hoge');
});

test('editPostのテスト', () => {
    post.editPost(1, 'fuga2');

    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n");

    expect(posts[1]).toBe("fuga2");
});