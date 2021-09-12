const fs = require("fs");

class ReactionRepository {
  filePath;

  constructor(dataDirPath) {
    this.filePath = `${dataDirPath}/reactions.txt`;
  }

  getByPostId(postId) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "");
    }
    let reactions = fs.readFileSync(this.filePath, "utf-8");

    // ["", "aaa,bbb", ""] => [["aaa,bbb"]]
    const reactionList = reactions.split("\n").filter((value) => value !== "").map((value) => value.split(","));

    return reactionList
      .filter((list) => list[1] === String(postId))
      .map((r) => {
        return { emoji: r[0], userId: r[2] };
      });
  }

  create(postId, userId, emoji) {
    
  }
}




module.exports.ReactionRepository = ReactionRepository;