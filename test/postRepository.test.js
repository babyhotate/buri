const mysql = require("mysql2/promise");

const { dbConfig } = require("../config.js");

const { PostRepository } = require("../repositories/postRepository");

let connection;

beforeEach(async () => {
  connection = await mysql.createConnection(dbConfig);
  await connection.beginTransaction();
  await connection.query(`DELETE FROM users`);
  await connection.query(`
    INSERT INTO users (id, user_id, display_name) 
    VALUES 
    (1, 'user1', 'aaa'), 
    (2, 'user2', 'bbb'), 
    (3, 'user3', 'ccc')
    `);
  await connection.query(`DELETE FROM posts`);
  await connection.query(`
    INSERT INTO posts (id, user_id, message) 
      VALUES 
      (1, 1, 'hoge'), 
      (2, 2, 'fuga')
    `);
});

afterEach(async () => {
  await connection.rollback();
  await connection.end();
  // connectionが切れるまで少し待つ必要があるみたい
  await new Promise((resolve) => setTimeout(resolve, 10));
});

describe("#findAll", () => {
  test("post全件が取得できる", async () => {
    const posts = await PostRepository.findAll(connection);
    expect(posts.length).toBe(2);
    expect(posts[0].userId).toBe(1);
    expect(posts[0].message).toBe("hoge");
    expect(posts[0].id).toBe(1);
    expect(posts[1].userId).toBe(2);
    expect(posts[1].message).toBe("fuga");
    expect(posts[1].id).toBe(2);
  });
});

describe("#create", () => {
  test("1件の投稿をデータストアに書き込む", async () => {
    const userId = 1;
    const message = "piyo";
    await PostRepository.create(connection, userId, message);

    const posts = await PostRepository.findAll(connection);
    const actual = posts.find(
      (p) => p.message == message && p.userId == userId
    );
    expect(actual).not.toBeUndefined();
  });
});

describe("#delete", () => {
  describe("1件の投稿を削除する", () => {
    test("削除されるべきでないオブジェクトが削除されていない", async () => {
      const userId = 2;
      const message = "fuga";

      const targetId = 1;
      await PostRepository.delete(connection, targetId);

      const posts = await PostRepository.findAll(connection);
      const actual = posts.find(
        (p) => p.message == message && p.userId == userId
      );
      expect(actual).not.toBeUndefined();
    });
    test("削除されるべきオブジェクトが削除されている", async () => {
      const userId = 1;
      const message = "hoge";

      const targetId = 1;
      await PostRepository.delete(connection, targetId);

      const posts = await PostRepository.findAll(connection);
      const actual = posts.find(
        (p) => p.message == message && p.userId == userId
      );
      expect(actual).toBeUndefined();
    });
  });
});

describe("#update", () => {
  test("1件の投稿を編集する", async () => {
    const id = 1;
    const message = "new hoge";
    await PostRepository.update(connection, id, message);

    const posts = await PostRepository.findAll(connection);
    const actual = posts.find((p) => p.id == id);
    expect(actual.message).toEqual(message);
  });
});
