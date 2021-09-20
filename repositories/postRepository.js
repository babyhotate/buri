const fs = require('fs');
const { Post } = require('../models/post');

class PostRepository {
    filePath;

    constructor(dataDirPath) {
        this.filePath = `${dataDirPath}/posts.txt`;
    }

    findAll() {
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

    create(userId, message) {
        const postList = this.findAll();
        const latestId = postList[postList.length - 1].id;
        const post = new Post(userId, message, Number(latestId) + 1);
        try {
          const postList = this.findAll();
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

    // @params index {Number}
    delete(index) {
        const postList = this.findAll();
        postList.splice(index, 1);
        const postStringLines = postList.map((p) => p.userId + "," + p.message + "," + p.id);
        const lines = postStringLines.join("\n");

        fs.writeFileSync(this.filePath, lines, function (err) {
            if (err) { throw err; }
        });
    }

    // @params index {Number}
    update(index, edit_content) {
        const postList = this.findAll();
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