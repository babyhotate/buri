const fs = require('fs');

const POSTS_FILE_PATH = 'data/posts.txt';

function getPosts() {
  if (!fs.existsSync(POSTS_FILE_PATH)) {
    fs.writeFileSync(POSTS_FILE_PATH, "");
  }
  let posts = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');

  // ["", "aaa", ""] => ["aaa"] 
  const postList = posts.split('\n').filter(value => value !== "");

  return postList;
}

function writePost(post) {
  try {
    const postList = getPosts();
    // なんかよくわからないが空ファイルも、1行の空行があるように見えてしまう
    // ので、全くの空かどうかで書き込み方を切り替える必要がある
    if (postList.length > 0) {
      fs.appendFileSync(POSTS_FILE_PATH, "\n" + post);
    } else {
      fs.appendFileSync(POSTS_FILE_PATH, post);
    }
  }
  catch (e) {
    console.log(e.message);
  }
}

// TODO: function deletePost(post_id)
function deletePost(post_id) {
  const postList = getPosts();
  postList.splice(post_id, 1);

  fs.writeFileSync(POSTS_FILE_PATH, postList.join("\n"), function (err) {
    if (err) { throw err; }
  });
}

function editPost(post_id, edit_content) {
  const postList = getPosts();
  postList[post_id] = edit_content;

  fs.writeFileSync(POSTS_FILE_PATH, postList.join("\n"), function (err) {
    if (err) { throw err; }
  });
}

module.exports.getPosts = getPosts;
module.exports.writePost = writePost;
module.exports.deletePost = deletePost;
module.exports.editPost = editPost;