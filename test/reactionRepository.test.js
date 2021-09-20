const { ReactionRepository } = require("../repositories/reactionRepository");
const fs = require("fs");

const DATA_DIR_PATH = "test/data";
const REACTION_FILE_PATH = `${DATA_DIR_PATH}/reactions.txt`;

let reactionRepository;
beforeEach(() => {
  reactionRepository = new ReactionRepository(DATA_DIR_PATH);
  // reactions.txtをテストしたい状態にする
  // emoji Name, postId, user ID
  fs.writeFileSync(REACTION_FILE_PATH, ["good,1,user1", "dog,1,user2", "dog,2,user1"].join("\n"));
});

describe("#getByPostId", () => {
  test("特定のPOSTに紐づくリアクションのリストを取得する", () => {
    const postId = 1;
    const reactions = reactionRepository.getByPostId(postId);
    expect(reactions.length).toBe(2);
    expect(reactions[0].emoji).toBe("good");
    expect(reactions[0].userId).toBe("user1");
    expect(reactions[1].emoji).toBe("dog");
    expect(reactions[1].userId).toBe("user2");
  });
});
