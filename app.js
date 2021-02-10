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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
