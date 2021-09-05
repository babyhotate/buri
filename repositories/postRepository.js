const fs = require('fs');
const { Post } = require('../models/post');

class PostRepository {
    filePath;

    constructor(dataDirPath) {
        this.filePath = `${dataDirPath}/posts.txt`;
    }

    getPosts() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "");
        }
        let posts = fs.readFileSync(this.filePath, 'utf-8');

        // ["", "aaa", ""] => ["aaa"] 
        const postList = posts.split('\n').filter(value => value !== "");

        // 文字列のリストから、Postモデルのリストを作る
        const models = postList.map(post => {
            const [userId, message, id] = post.split(",");
            return new Post(userId, message, id);
        });
        return models;
    }

    newWritePost(userId, message) {
        const postList = this.getPosts();
        const latestId = postList[postList.length - 1].id;
        const post = new Post(userId, message, Number(latestId) + 1);
        try {
          const postList = this.getPosts();
          // なんかよくわからないが空ファイルも、1行の空行があるように見えてしまう
          // ので、全くの空かどうかで書き込み方を切り替える必要がある
          if (postList.length > 0) {
            fs.appendFileSync(this.filePath, "\n" + post.userId + "," + post.message + "," + post.id);
          } else {
            fs.appendFileSync(this.filePath, post.userId + "," + post.message + "," + post.id);
          }
        } catch (e) {
          console.log(e.message);
        }
    }

    writePost(post) {
        try {
            const postList = this.getPosts();
            // なんかよくわからないが空ファイルも、1行の空行があるように見えてしまう
            // ので、全くの空かどうかで書き込み方を切り替える必要がある
            if (postList.length > 0) {
                fs.appendFileSync(this.filePath, "\n" + post.userId + "," + post.message);
            } else {
                fs.appendFileSync(this.filePath, post.userId + "," + post.message);
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
    // @params index {Number}
    deletePost(index) {
        const postList = this.getPosts();
        postList.splice(index, 1);
        const postStringLines = postList.map((p) => p.userId + "," + p.message + "," + p.id);
        const lines = postStringLines.join("\n");

        fs.writeFileSync(this.filePath, lines, function (err) {
            if (err) { throw err; }
        });
    }

    // @params index {Number}
    editPost(index, edit_content) {
        const postList = this.getPosts();
        const editedPost = new Post(postList[index].userId, edit_content, postList[index].id);
        postList[index] = editedPost;
        const postStringLines = postList.map((p) => p.userId + "," + p.message + "," + p.id);
        const lines = postStringLines.join("\n");

        fs.writeFileSync(this.filePath, lines, function (err) {
            if (err) { throw err; }
        });
    }
}

module.exports.PostRepository = PostRepository;