const mysql = require("mysql2/promise");

const { dbConfig } = require("../config.js");

const { Channel_mappingRepository } = require("../repositories/channel_mappingRepository");

let connection;


beforeAll(async () => {
  connection = await mysql.createConnection(dbConfig);
  await connection.beginTransaction();
})

beforeEach(async () => {
  await connection.query(`DELETE FROM posts`);
  await connection.query(`DELETE FROM users`);
  await connection.query(`DELETE FROM channels`);
  await connection.query(`DELETE FROM channel_mappings`);
  await connection.query(`
    INSERT INTO users (id, user_id, display_name) 
    VALUES 
    (1, 'user1', 'aaa'), 
    (2, 'user2', 'bbb')
    `);
  await connection.query(`
    INSERT INTO posts (id, user_id, message) 
      VALUES 
      (1, 1, 'hoge'), 
      (2, 2, 'fuga')
    `);
  await connection.query(`
    INSERT INTO channels (id, name) 
      VALUES 
      (1, 'general'),
      (2, 'hotate')
    `);
  await connection.query(`
    INSERT INTO channel_mappings (id, channel_id, user_id) 
      VALUES 
      (1, 1, 1),
      (2, 2, 2)
    `);
});

afterAll(async () => {
  await connection.rollback();
  await connection.end();
  // connectionが切れるまで少し待つ必要があるみたい
  await new Promise((resolve) => setTimeout(resolve, 10));
});

describe("#findAll", () => {
  test("channel_mapping全件が取得できる", async () => {
    const Channel_mappings = await Channel_mappingRepository.findAll(connection);
    expect(Channel_mappings.length).toBe(2);
    expect(Channel_mappings[0].id).toBe(1);
    expect(Channel_mappings[0].channel_id).toBe(1);
    expect(Channel_mappings[0].user_id).toBe(1);
    expect(Channel_mappings[1].id).toBe(2);
    expect(Channel_mappings[1].channel_id).toBe(2);
    expect(Channel_mappings[1].user_id).toBe(2);

  });
});
