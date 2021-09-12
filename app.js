const {
  Post
} = require('./models/post');
const {
  UserRepository
} = require('./repositories/userRepository');
const {
  PostRepository
} = require('./repositories/postRepository');
const { EmojiRepository } = require('./repositories/emojiRepository');

const handlebars = require('express-handlebars');
const express = require('express');
const app = express();
app.engine('handlebars', handlebars());
app.set("view engine", "handlebars");
const port = 3000;

const DATA_DIR_PATH = 'data';

/**
 * ポストの一覧を表示する
 */
app.get('/', (req, res) => {
  const postRepository = new PostRepository(DATA_DIR_PATH);
  const postList = postRepository.getPosts();
  const userIds = postList.map(post => post.userId);

  const userRepository = new UserRepository(DATA_DIR_PATH);
  const usersHasPosts = userRepository.getByIds(userIds);

  const users = userRepository.getAll();
  
  const emojiRepository = new EmojiRepository(DATA_DIR_PATH);
  const emojis = emojiRepository.getAll();

  res.render("index", {
    postList: postList.map(post => ({
      ...post,
      user: usersHasPosts.find((user) => user.id === post.userId),
      emojis: emojis,
    })),
    users: users
  });
});

/**
 * 最新のポスト一覧をJSONで返す
 */
app.get('/api/posts', (req, res) => {
  const postRepository = new PostRepository(DATA_DIR_PATH);
  const postList = postRepository.getPosts();
  const userIds = postList.map(post => post.userId);

  const userRepository = new UserRepository(DATA_DIR_PATH);
  const usersHasPosts = userRepository.getByIds(userIds);

  // このJSONにuser.displayNameも含める
  res.json({
    posts: postList.map(post => ({
      ...post,
      user: usersHasPosts.find(user => user.id === post.userId)
    })),
  });
});


/**
 * ポストを追加する
 * e.g. /add_post?user=user1&post=buri
 */
app.get('/add_post', (req, res) => {
  const postRepository = new PostRepository(DATA_DIR_PATH);
  postRepository.writePost(req.query.user, req.query.post);
  res.redirect('/');
});

/**
 * ポストを削除する
 * e.g. /delete_post?post_id=1
 */
app.get('/delete_post', (req, res) => {
  const postRepository = new PostRepository(DATA_DIR_PATH);
  postRepository.deletePost(req.query.post_id);
  res.redirect('/');
});

/**
 * ポストを編集する
 * e.g. /edit_post?post_id=1&edit_content=buri2
 */
app.get("/edit_post", (req, res) => {
  const postRepository = new PostRepository(DATA_DIR_PATH);
  postRepository.editPost(req.query.post_id, req.query.edit_content);
  res.redirect('/');
});

app.get('/kuji', (req, res) => {
  let box = ["shellzu 🍣", "nakanoh 👤", "inukawaii 🐶", "aksh-t 🫀"];
  const result_list = [];
  while (box.length) {
    const index = Math.floor(Math.random() * box.length);
    result_list.push(box[index]);
    box = box.filter(x => x !== box[index]);
  }
  res.send(`<html style="background: black; font-size: xx-large; color: wheat;">
  <ol>${result_list.map(x => "<li>" + x + "</li>").join("\n")}</ol>
  </html>`);
});

app.use(express.static("assets"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});