const mysql = require("mysql2/promise");

const { dbConfig } = require("../config.js");

const { ChannelUserMappingRepository } = require("../repositories/channelUserMappingRepository");

let connection;


beforeAll(async () => {
  connection = await mysql.createConnection(dbConfig);
  await connection.beginTransaction();
})

beforeEach(async () => {
  await connection.query(`DELETE FROM posts`);
  await connection.query(`DELETE FROM channel_user_mappings`);
  await connection.query(`DELETE FROM users`);
  await connection.query(`DELETE FROM channels`);
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
    INSERT INTO channel_user_mappings (id, channelId, userId) 
      VALUES 
      (1, 1, 1),
      (2, 2, 2)
    `);
});

afterAll(async () => {
  await connection.rollback();
  await connection.end();
  // connectionが切れるまで少し待つ必要があるみたい
  await new Promise((resolve) => setTimeout(resolve, 20));
});

describe("#findAll", () => {
  test("channelUserMapping全件が取得できる", async () => {
    const channelUserMappings = await ChannelUserMappingRepository.findAll(connection);
    expect(channelUserMappings.length).toBe(2);
    expect(channelUserMappings[0].id).toBe(1);
    expect(channelUserMappings[0].channelId).toBe(1);
    expect(channelUserMappings[0].userId).toBe(1);
    expect(channelUserMappings[1].id).toBe(2);
    expect(channelUserMappings[1].channelId).toBe(2);
    expect(channelUserMappings[1].userId).toBe(2);

  });
});
