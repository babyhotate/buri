const { UserRepository } = require('./userRepository');
const fs = require('fs');

const DATA_DIR_PATH = 'test/data';
const USERS_FILE_PATH = `${DATA_DIR_PATH}/users.txt`;

test('getByIdのテスト', () => {
    const userRepository = new UserRepository(DATA_DIR_PATH);
    const user = userRepository.getById('user2');
    expect(user.id).toBe("user2");
    expect(user.displayName).toBe("hamachi");
});

describe('#getByIds', () => {
    test('userを取得できる', () => {
        fs.writeFileSync(USERS_FILE_PATH, ["user1,hotate", "user2,hamachi"].join("\n"));

        const userRepository = new UserRepository(DATA_DIR_PATH);
        const userIds = ["user1", "user2"];
        const users = userRepository.getByIds(userIds);

        expect(users.length).toBe(2);
        expect(users[0].id).toBe("user1");
        expect(users[0].displayName).toBe("hotate");
        expect(users[1].id).toBe("user2");
        expect(users[1].displayName).toBe("hamachi");
    });
});