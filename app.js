const fs = require('fs');

const express = require('express')
const app = express()
const port = 3000

let posts = fs.readFileSync("data/posts.txt", 'utf-8');
const postList = posts.split('\n');
const liTags = postList.map(x => `<li>${x}</li>`)
console.log(liTags.join(''));

app.get('/', (req, res) => {
  res.send(`
  <h1>buri</h1>
  <ul>
    ${liTags.join('')}
  </ul>
  `)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})