
const { getPosts, writePost, deletePost, editPost } = require('./post');

const fs = require("fs");
const POSTS_FILE_PATH = 'data/posts.txt';


test('getPostsのテスト', () => {
    // 事前にposts.txtの今の状態を取っておく
    const beforePostsText = fs.readFileSync(POSTS_FILE_PATH);

    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n") + "\n");

    // テストする
    const posts = getPosts();
    expect(posts.length).toBe(2);
    expect(posts[0]).toBe("hoge");
    expect(posts[1]).toBe("fuga");

    // 事後にposts.txtをテスト前の状態に戻す
    fs.writeFileSync(POSTS_FILE_PATH, beforePostsText);
});

test('writePostのテスト', () => {
    // 事前にposts.txtの今の状態を取っておく
    const beforePostsText = fs.readFileSync(POSTS_FILE_PATH);
    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n") + "\n");

    // テストする
    writePost("piyo");
    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n").filter(value => value !== "");

    expect(posts[posts.length - 1]).toBe("piyo");

    // 事後にposts.txtをテスト前の状態に戻す
    fs.writeFileSync(POSTS_FILE_PATH, beforePostsText);
});

test('deletePostのテスト', () => {
    // 事前にposts.txtの今の状態を取っておく
    const beforePostsText = fs.readFileSync(POSTS_FILE_PATH);
    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n") + "\n");

    deletePost(1);

    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n").filter(value => value !== "");

    expect(posts).not.toContain('fuga');
    expect(posts).toContain('hoge');

    // 事後にposts.txtをテスト前の状態に戻す
    fs.writeFileSync(POSTS_FILE_PATH, beforePostsText);
});

test('editPostのテスト', () => {
    // 事前にposts.txtの今の状態を取っておく
    const beforePostsText = fs.readFileSync(POSTS_FILE_PATH);
    // posts.txtをテストしたい状態にする
    fs.writeFileSync(POSTS_FILE_PATH, ["hoge", "fuga"].join("\n") + "\n");

    editPost(1, 'fuga2');

    let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
    posts = posts.split("\n").filter(value => value !== "");

    expect(posts[1]).toBe("fuga2");

    // 事後にposts.txtをテスト前の状態に戻す
    fs.writeFileSync(POSTS_FILE_PATH, beforePostsText);

});