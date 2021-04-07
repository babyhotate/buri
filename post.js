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
    fs.appendFileSync(POSTS_FILE_PATH, post + "\n");
  }
  catch (e) {
    console.log(e.message);
  }
}

// TODO: function deletePost(post_id)
function deletePost(post_id) {
  const postList = getPosts();
  postList.splice(post_id, 1);

  fs.writeFileSync(POSTS_FILE_PATH, postList.join("\n") + "\n", function (err) {
    if (err) { throw err; }
  });
}

function editPost(post_id, edit_content) {
  const postList = getPosts();
  postList[post_id] = edit_content;

  fs.writeFileSync(POSTS_FILE_PATH, postList.join("\n") + "\n", function (err) {
    if (err) { throw err; }
  });
}

module.exports.getPosts = getPosts;
module.exports.writePost = writePost;
module.exports.deletePost = deletePost;
module.exports.editPost = editPost;