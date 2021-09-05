const mysql = require('mysql2/promise');

const { dbConfig } = require('../config.js');

const { User } = require('../models/user');
const { UserRepository } = require('../repositories/userRdbRepository');

let connection;

beforeAll(async () => {
    connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();
    await connection.query(`
        DELETE FROM users
    `);

    await connection.query(`
        INSERT INTO users (id, display_name) 
        VALUES 
          ('user1', 'aaa'), 
          ('user2', 'bbb'), 
          ('user3', 'ccc')
    `);
});

afterAll(async () => {
    await connection.rollback();
    await connection.end();
    // connectionが切れるまで少し待つ必要があるみたい
    await new Promise(resolve => setTimeout(resolve, 10));
});

test("#getAll", async () => {
    const expectUsers = [
        new User("user1", "aaa"),
        new User("user2", "bbb"),
        new User("user3", "ccc"),
    ];

    const users = await UserRepository.getAll(connection);
    expect(users).toEqual(expectUsers);
});


test("#getById", async () => {
    const expectUser = new User("user2", "bbb");

    const user = await UserRepository.getById(connection, "user2");
    expect(user).toEqual(expectUser);
});

test("#getByIds", async () => {
    const expectUsers = [new User("user2", "bbb"), new User("user3", "ccc")];

    const users = await UserRepository.getByIds(connection, expectUsers.map(user => user.id));
    expect(users).toEqual(expectUsers);
});