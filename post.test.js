
const { Post } = require('./post');

const fs = require("fs");
const POSTS_FILE_PATH = 'test/data/posts.txt';

let post;
function before() {
    post = new Post('test/data/posts.txt')
}

test('getPostsのテスト', () => {
    before();
    // 事前にposts.txtの今の状態を取っておく
    const beforePostsText = fs.readFileSync(POSTS_FILE_PATH);

    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n"));

    // テストする

    const posts = post.getPosts();
    expect(posts.length).toBe(2);
    expect(posts[0]).toBe("hoge");
    expect(posts[1]).toBe("fuga");

    // 事後にposts.txtをテスト前の状態に戻す
    fs.writeFileSync(POSTS_FILE_PATH, beforePostsText);
});

test('writePostのテスト', () => {
    before();
    // 事前にposts.txtの今の状態を取っておく
    const beforePostsText = fs.readFileSync(POSTS_FILE_PATH);
    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n"));

    // テストする
    post.writePost("piyo");
    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n");

    expect(posts[posts.length - 1]).toBe("piyo");

    // 事後にposts.txtをテスト前の状態に戻す
    fs.writeFileSync(POSTS_FILE_PATH, beforePostsText);
});

test('deletePostのテスト', () => {
    before();
    // 事前にposts.txtの今の状態を取っておく
    const beforePostsText = fs.readFileSync(POSTS_FILE_PATH);
    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n"));

    post.deletePost(1);

    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n");

    expect(posts).not.toContain('fuga');
    expect(posts).toContain('hoge');

    // 事後にposts.txtをテスト前の状態に戻す
    fs.writeFileSync(POSTS_FILE_PATH, beforePostsText);
});

test('editPostのテスト', () => {
    before();
    // 事前にposts.txtの今の状態を取っておく
    const beforePostsText = fs.readFileSync(POSTS_FILE_PATH);
    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n"));

    post.editPost(1, 'fuga2');

    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n");

    expect(posts[1]).toBe("fuga2");

    // 事後にposts.txtをテスト前の状態に戻す
    fs.writeFileSync(POSTS_FILE_PATH, beforePostsText);

});