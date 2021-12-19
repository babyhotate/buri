const mysql = require("mysql2/promise");

const { dbConfig } = require("../config.js");

const { ChannelRepository } = require("../repositories/channelRepository");

let connection;


beforeAll(async () => {
  connection = await mysql.createConnection(dbConfig);
  await connection.beginTransaction();
})

beforeEach(async () => {
  await connection.query(`DELETE FROM channels`);
  await connection.query(`
    INSERT INTO channels (id, name) 
      VALUES 
      (1, 'general'),
      (2, 'hotate')
    `);
});

afterAll(async () => {
  await connection.rollback();
  await connection.end();
  // connectionが切れるまで少し待つ必要があるみたい
  await new Promise((resolve) => setTimeout(resolve, 20));
});

describe("#findAll", () => {
  test("channel全件が取得できる", async () => {
    const channels = await ChannelRepository.findAll(connection);
    expect(channels.length).toBe(2);
    expect(channels[0].id).toBe(1);
    expect(channels[0].name).toBe("general");
    expect(channels[1].id).toBe(2);
    expect(channels[1].name).toBe("hotate");
  });
});
