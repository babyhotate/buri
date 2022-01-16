const mysql = require("mysql2/promise");

const { dbConfig } = require("../config.js");

const { ChannelMappingRepository } = require("../repositories/channelMappingRepository");

let connection;


beforeAll(async () => {
  connection = await mysql.createConnection(dbConfig);
  await connection.beginTransaction();
})

beforeEach(async () => {
  await connection.query(`DELETE FROM posts`);
  await connection.query(`DELETE FROM channel_mappings`);
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
  await new Promise((resolve) => setTimeout(resolve, 20));
});

describe("#findAll", () => {
  test("channelMapping全件が取得できる", async () => {
    const channelMappings = await ChannelMappingRepository.findAll(connection);
    expect(channelMappings.length).toBe(2);
    expect(channelMappings[0].id).toBe(1);
    expect(channelMappings[0].channel_id).toBe(1);
    expect(channelMappings[0].user_id).toBe(1);
    expect(channelMappings[1].id).toBe(2);
    expect(channelMappings[1].channel_id).toBe(2);
    expect(channelMappings[1].user_id).toBe(2);

  });
});
