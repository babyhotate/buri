const fs = require('fs');

const express = require('express')
const app = express()
const port = 3000

let posts = fs.readFileSync("data/posts.txt", 'utf-8');
console.log(posts);

app.get('/', (req, res) => {
  res.send(`
  <h1>buri</h1>
  <ul>
    <li>すごい</li>
    <li>あとで</li>
    <li>グッド</li>
  </ul>
  `)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})