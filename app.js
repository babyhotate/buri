const mysql = require("mysql2/promise");
const { dbConfig } = require("./config.js");

const { Post } = require("./models/post");
const { UserRepository } = require("./repositories/userRepository");
const { PostRepository } = require("./repositories/postRepository");

const handlebars = require("express-handlebars");
const express = require("express");
const app = express();
app.use(express.json());
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
const port = 3000;

const DATA_DIR_PATH = "data";

// CAUTION: ごく稀にDB接続が間に合わなくてエラーになるかも
// 上記問題を解消するためにTop-Level awaitを使いたいが、CommonJSではなくESModulesに変更する必要がある
let connection;
(async () => {
  connection = await mysql.createConnection(dbConfig);
})();

/**
 * ポストの一覧を表示する
 */
app.get('/', async (req, res) => {
  const postList = await PostRepository.findAll(connection);
  const userIds = postList.map(post => post.userId);

  const usersHasPosts = userIds.length > 0 ? await UserRepository.getByIds(connection, userIds) : [];

  const users = await UserRepository.getAll(connection);

  res.render("index", {
    postList: postList.map((post) => ({
      ...post,
      user: usersHasPosts.find((user) => user.id === post.userId),
    })),
    users: users,
  });
});

/**
 * 最新のポスト一覧をJSONで返す
 */
app.get('/api/posts', async (req, res) => {
  const postList = await PostRepository.findAll(connection);
  const userIds = postList.map(post => post.userId);

  const usersHasPosts = await UserRepository.getByIds(connection, userIds);

  // このJSONにuser.displayNameも含める
  res.json({
    posts: postList.map((post) => ({
      ...post,
      user: usersHasPosts.find((user) => user.id === post.userId),
    })),
  });
});

/**
 * ポストを追加する
 * e.g. /add_post?user=user1&post=buri
 */
app.get("/add_post", async (req, res) => {
  await PostRepository.create(connection, req.query.user, req.query.post);
  res.redirect("/");
});

/**
 * ポストを追加するAPI
 */
app.post("/api/posts", async (req, res) => {
  if (!(req.body.user && req.body.post)) {
    res.status(400);
    res.json({
      success: false,
    });
    return;
  }
  await PostRepository.create(connection, req.query.user, req.query.post);
  res.json({
    success: true,
  });
});

/**
 * ポストを削除する
 * e.g. /delete_post?post_id=1
 */
app.get("/delete_post", async (req, res) => {
  await PostRepository.delete(connection, req.query.post_id);
  res.redirect("/");
});

/**
 * ポストを編集する
 * e.g. /edit_post?post_id=1&edit_content=buri2
 */
app.get("/edit_post", async (req, res) => {
  await PostRepository.update(
    connection,
    req.query.post_id,
    req.query.edit_content
  );
  res.redirect("/");
});

/**
 * 全ユーザ情報リストを返す
 */
 app.get('/api/users', async (req, res) => {
  const users = await UserRepository.getAll(connection);
  res.json({
    users: users
  });
});

app.get("/kuji", (req, res) => {
  let box = ["shellzu 🍣", "nakanoh 👤", "inukawaii 🐶", "aksh-t 🫀"];
  const result_list = [];
  while (box.length) {
    const index = Math.floor(Math.random() * box.length);
    result_list.push(box[index]);
    box = box.filter((x) => x !== box[index]);
  }
  res.send(`<html style="background: black; font-size: xx-large; color: wheat;">
  <ol>${result_list.map((x) => "<li>" + x + "</li>").join("\n")}</ol>
  </html>`);
});

app.use(express.static("assets"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
