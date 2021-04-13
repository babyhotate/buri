const fs = require('fs');

class Post{
  constructor(filePath){
    this.filePath = filePath
  }

  getPosts() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "");
    }
    let posts = fs.readFileSync(this.filePath, 'utf-8');

    // ["", "aaa", ""] => ["aaa"] 
    const postList = posts.split('\n').filter(value => value !== "");

    return postList;
  }

  writePost(post) {
    try {
      const postList = this.getPosts();
      // なんかよくわからないが空ファイルも、1行の空行があるように見えてしまう
      // ので、全くの空かどうかで書き込み方を切り替える必要がある
      if (postList.length > 0) {
        fs.appendFileSync(this.filePath, "\n" + post);
      } else {
        fs.appendFileSync(this.filePath, post);
      }
    }
    catch (e) {
      console.log(e.message);
    }
  }

  // TODO: function deletePost(post_id)
  deletePost(post_id) {
    const postList = this.getPosts();
    postList.splice(post_id, 1);

    fs.writeFileSync(this.filePath, postList.join("\n"), function (err) {
      if (err) { throw err; }
    });
  }

  editPost(post_id, edit_content) {
    const postList = this.getPosts();
    postList[post_id] = edit_content;

    fs.writeFileSync(this.filePath, postList.join("\n"), function (err) {
      if (err) { throw err; }
    });
  }
}

module.exports.Post = Post;