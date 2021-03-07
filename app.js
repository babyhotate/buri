const fs = require('fs');

const express = require('express');
const app = express();
const port = 3000;

const POSTS_FILE_PATH = 'data/posts.txt';

app.get('/', (req, res) => {
  if (!fs.existsSync(POSTS_FILE_PATH)) {
    fs.writeFileSync(POSTS_FILE_PATH, "");
  }
  let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
  const postList = posts.split('\n').filter(value => value !== "");
  // ["", "aaa", ""] => ["aaa"] 
  const liTags = postList.map((x, i) => `<li>${x}</li><form action="/delete_post" method="get">
  <input type="hidden" value=${i} id="post" name="post_id">
  <input type="submit" value="廃棄"></form>`);

  // テキストに書き込む？
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

app.get('/home', (req, res) => {
  // DBに書き込む
  try {
    fs.appendFileSync(POSTS_FILE_PATH, req.query.post + "\n");
  }
  catch (e) {
    console.log(e.message);
  }
  // /にリダイレクトする
  res.redirect('/');
});

app.get('/delete_post', (req, res) => {
  // 渡ってくるクエリパラメータは↓の形
  // /delete_post?post_id=1

  // 指定されたポストをposts.txtから削除する
  //   ファイルを読み込む
  let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
  const postList = posts.split('\n').filter(value => value !== "");
  //   リストから対象の投稿を削除する
  //     - 削除対象のIDを取得する
  const targetId = req.query.post_id;
  //     - 削除対象のIDに合致する投稿をリストから削除する
  postList.splice(targetId, 1);
  //   ファイルにリストを書き込む
  fs.writeFile(POSTS_FILE_PATH, postList.join("\n") + "\n", function (err) {
    if (err) { throw err; }
  });
  // / にリダイレクトする
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
