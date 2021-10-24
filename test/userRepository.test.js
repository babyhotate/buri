const mysql = require("mysql2/promise");

const { dbConfig } = require("../config.js");

const { User } = require("../models/user");
const { UserRepository } = require("../repositories/userRepository");

let connection;

beforeAll(async () => {
  connection = await mysql.createConnection(dbConfig);
  await connection.beginTransaction();
  await connection.query(`DELETE FROM posts`);
  await connection.query(`DELETE FROM users`);

  await connection.query(`
        INSERT INTO users (id, user_id, display_name) 
        VALUES 
          (1, 'user1', 'aaa'), 
          (2, 'user2', 'bbb'), 
          (3, 'user3', 'ccc')
    `);
});

afterAll(async () => {
  await connection.rollback();
  await connection.end();
  // connectionが切れるまで少し待つ必要があるみたい
  await new Promise((resolve) => setTimeout(resolve, 10));
});

describe("#getByUserId", () => {
  test("", async () => {
    const expectUser = new User({ id: 2, userId: "user2", displayName: "bbb" });

    const user = await UserRepository.getByUserId(connection, "user2");
    expect(user).toEqual(expectUser);
  });
});

describe("#getByIds", () => {
  test("userを取得できる", async () => {
    const expectUsers = [
      new User({ id: 2, userId: "user2", displayName: "bbb" }),
      new User({ id: 3, userId: "user3", displayName: "ccc" }),
    ];

    const users = await UserRepository.getByIds(
      connection,
      expectUsers.map((user) => user.id)
    );
    expect(users).toEqual(expectUsers);
  });
  test("存在しないIdが渡されたときにエラーにならない", async () => {
    const expectUsers = [
      new User({ id: 1, userId: "user1", displayName: "aaa" }),
    ];
    const users = await UserRepository.getByIds(connection, [
      1,
      4,
    ]);
    expect(users).toEqual(expectUsers);
  });
  test("空配列が指定された時に例外が発生すること", async () => {
    const promise = UserRepository.getByIds(connection, []);
    await expect(promise).rejects.toThrow('ids には空配列を指定できません');
  });
});

describe("#getByUserIds", () => {
  test("userを取得できる", async () => {
    const expectUsers = [
      new User({ id: 2, userId: "user2", displayName: "bbb" }),
      new User({ id: 3, userId: "user3", displayName: "ccc" }),
    ];

    const users = await UserRepository.getByUserIds(
      connection,
      expectUsers.map((user) => user.userId)
    );
    expect(users).toEqual(expectUsers);
  });
  test("存在しないIdが渡されたときにエラーにならない", async () => {
    const expectUsers = [
      new User({ id: 1, userId: "user1", displayName: "aaa" }),
    ];
    const users = await UserRepository.getByUserIds(connection, [
      "user1",
      "user4",
    ]);
    expect(users).toEqual(expectUsers);
  });
  test("空配列が指定された時に例外が発生すること", async () => {
    const promise = UserRepository.getByUserIds(connection, []);
    await expect(promise).rejects.toThrow('userIds には空配列を指定できません');
  })
});

describe("#getAll", () => {
  test("Userのリストを返す", async () => {
    const expectUsers = [
      new User({ id: 1, userId: "user1", displayName: "aaa" }),
      new User({ id: 2, userId: "user2", displayName: "bbb" }),
      new User({ id: 3, userId: "user3", displayName: "ccc" }),
    ];

    const users = await UserRepository.getAll(connection);
    expect(users).toEqual(expectUsers);
  });
});
