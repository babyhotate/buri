const mysql = require("mysql2/promise");

const { dbConfig } = require("../config.js");

let connection;

beforeEach(() => {
  connection = await mysql.createConnection(dbConfig);
  await connection.beginTransaction();
  await connection.query(`
        DELETE FROM emojis
    `);

  await connection.query(`
        INSERT INTO emojis (name, emoji) 
        VALUES 
          ('good', '👍'), 
          ('dog', '🐶')
    `);

  emojiRepository = new EmojiRepository(DATA_DIR_PATH);
  // emojis.txtをテストしたい状態にする
  fs.writeFileSync(EMOJI_FILE_PATH, ["good,👍", "dog,🐶"].join("\n"));
});

afterAll(async () => {
  await connection.rollback();
  await connection.end();
  // connectionが切れるまで少し待つ必要があるみたい
  await new Promise((resolve) => setTimeout(resolve, 10));
});

describe("#getAll", () => {
  test("emoji全件が取得できる", () => {
    const emojis = await EmojiRepository.getAll();
    expect(emojis.length).toBe(2);
    expect(emojis[0].name).toBe("good");
    expect(emojis[0].emoji).toBe("👍");
    expect(emojis[1].name).toBe("dog");
    expect(emojis[1].emoji).toBe("🐶");
  });
});
