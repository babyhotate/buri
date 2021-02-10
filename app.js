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
  const postList = posts.split('\n');
  const liTags = postList.map(x => {
    if (x === "") {
      return "";
    }
    return `<li>${x}</li>`;
  });

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
  console.log(req.query.post);
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
