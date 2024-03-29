const mysql = require("mysql2/promise");
const { dbConfig } = require("./config.js");

const { Post } = require("./models/post");
const { UserRepository } = require("./repositories/userRepository");
const { PostRepository } = require("./repositories/postRepository");

const handlebars = require("express-handlebars");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

const DATA_DIR_PATH = "data";

// CAUTION: ごく稀にDB接続が間に合わなくてエラーになるかも
// 上記問題を解消するためにTop-Level awaitを使いたいが、CommonJSではなくESModulesに変更する必要がある
let connection;
(async () => {
  connection = await mysql.createConnection(dbConfig);
})();

/**
 * ログイン画面を表示する
 */
app.get('/login', async (req, res) => {
  res.render("login");
});

/**
 * ログインを実行する
 */
app.post('/login', async (req, res) => {
  // 認証
  // userIdをキーにUser情報を取得する
  const user = await UserRepository.getByUserId(connection, req.body.userId);

  // User情報が取得できなかったら、または、
  // 取得したUser情報のpasswordと入力されたpasswordが一致しなかったらログイン画面に遷移する
  if (!user || user.password !== req.body.password) {
    res.status(401);
    res.render("login");
    return;
  }
  // 一致したらホーム画面に遷移する
  res.cookie("userId", req.body.userId);
  res.redirect("/");
});

/**
 * ログアウトする
 */
app.get('/logout', async (req, res) => {
  res.clearCookie("userId");
  res.redirect("/login");
});

/**
 * ポストの一覧を表示する
 */
app.get('/', async (req, res) => {
  console.log('Cookies: ', req.cookies);
  const postList = await PostRepository.findAll(connection);
  const userIds = postList.map(post => post.userId);

  const usersHasPosts = userIds.length > 0 ? await UserRepository.getByIds(connection, userIds) : [];

  const users = await UserRepository.getAll(connection);

  res.render("index", {
    userId: req.cookies.userId,
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
  await PostRepository.create(connection, req.body.user, req.body.post);
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
 * ポストを削除するAPI
 */
app.delete("/api/posts/:id", async (req, res) => {
  await PostRepository.delete(connection, req.params.id);
  res.json({
    success: true,
  });
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
 * ポストを編集するAPI
 */
app.patch("/api/posts", async (req, res) => {
  if (!(req.body.post_id && req.body.edit_content)) {
    res.status(400);
    res.json({
      success: false,
    });
    return;
  }
  await PostRepository.update(
    connection,
    req.body.post_id,
    req.body.edit_content
  );
  res.json({
    success: true,
  });
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

module.exports = app;
