const post = require('./post');

const express = require('express');
const app = express();
const port = 3000;

/**
 * ポストの一覧を表示する
 */
app.get('/', (req, res) => {
  const postList = post.getPosts();
  const liTags = postList.map((x, i) => `
    <li>
      <form action="/delete_post" method="get">
        <input type="hidden" value=${i} id="post" name="post_id">
        <input type="submit" value="廃棄">
      </form>
      <form action="/edit_post" method="get">
        <input type=text name="edit_content" value="${x}">
        <input type="hidden" value=${i} name="post_id">
        <input type="submit" value="解体">
      </form>
    </li>`
  );

  res.send(`
  <h1>buri</h1>
  <ul>
    ${liTags.join('')}
  </ul>
  <form action="/home" method="get">
    <input type="text" id="post" name="post" required
        minlength="1" maxlength="1000" size="30">
    <input type="submit" value="出荷">
  </form>
  `);
});


/**
 * ポストを追加する
 * e.g. /home?post=buri
 */
app.get('/home', (req, res) => {
  post.writePost(req.query.post);
  res.redirect('/');
});

/**
 * ポストを削除する
 * e.g. /delete_post?post_id=1
 */
app.get('/delete_post', (req, res) => {
  post.deletePost(req.query.post_id);
  res.redirect('/');
});

/**
 * ポストを編集する
 * e.g. /edit_post?post_id=1&edit_content=buri2
 */
app.get("/edit_post", (req, res) => {
  post.editPost(req.query.post_id, req.query.edit_content);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
