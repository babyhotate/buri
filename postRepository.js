const fs = require('fs');
const { Post } = require('./post');

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
            const [userId, message] = post.split(",");
            return new Post(userId, message);
        });
        return models;
    }

    writePost(post) {
        try {
            const postList = this.getPosts();
            // なんかよくわからないが空ファイルも、1行の空行があるように見えてしまう
            // ので、全くの空かどうかで書き込み方を切り替える必要がある
            if (postList.length > 0) {
                fs.appendFileSync(this.filePath, "\n" + post.message);
            } else {
                fs.appendFileSync(this.filePath, post.message);
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }

    deletePost(post_id) {
        const postList = this.getPosts();
        postList.splice(post_id, 1);
        const messages = postList.map((p) => p.message);
        const lines = messages.join("\n");

        fs.writeFileSync(this.filePath, lines, function (err) {
            if (err) { throw err; }
        });
    }

    editPost(post_id, edit_content) {
        const postList = this.getPosts();
        postList[post_id] = edit_content;
        const messages = postList.map((p) => p.message);
        const lines = messages.join("\n");

        fs.writeFileSync(this.filePath, lines, function (err) {
            if (err) { throw err; }
        });
    }
}

module.exports.PostRepository = PostRepository;