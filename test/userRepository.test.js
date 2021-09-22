const mysql = require('mysql2/promise');

const { dbConfig } = require('../config.js');

const { User } = require('../models/user');
const { UserRepository } = require('../repositories/userRepository');

let connection;

beforeAll(async () => {
    connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();
    await connection.query(`
        DELETE FROM users
    `);

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
    await new Promise(resolve => setTimeout(resolve, 10));
});


describe("#getByUserId", () => {
    test("", async () => {
        const expectUser = new User(2, "user2", "bbb");

        const user = await UserRepository.getByUserId(connection, "user2");
        expect(user).toEqual(expectUser);
    });
});

describe("#getByUserIds", () => {
    test("userを取得できる", async () => {
        const expectUsers = [new User(2, "user2", "bbb"), new User(3, "user3", "ccc")];

        const users = await UserRepository.getByUserIds(connection, expectUsers.map(user => user.userId));
        expect(users).toEqual(expectUsers);
    });
    test("存在しないIdが渡されたときにエラーにならない", async () => {
        const expectUsers = [new User(1, "user1", "aaa")];
        const users = await UserRepository.getByUserIds(connection, ["user1", "user4"]);
        expect(users).toEqual(expectUsers);
    });
});

describe("#getAll", () => {
    test("Userのリストを返す", async () => {
        const expectUsers = [
            new User(1, "user1", "aaa"),
            new User(2, "user2", "bbb"),
            new User(3, "user3", "ccc"),
        ];

        const users = await UserRepository.getAll(connection);
        expect(users).toEqual(expectUsers);
    });
});
