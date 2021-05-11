const { UserRepository } = require('./userRepository');

const DATA_DIR_PATH = 'test/data';

test('getByIdのテスト', () => {
    const userRepository = new UserRepository(DATA_DIR_PATH);
    const user = userRepository.getById('user2');
    expect(user.id).toBe("user2");
    expect(user.displayName).toBe("hamachi");
});