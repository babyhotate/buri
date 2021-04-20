const { UserRepository } = require('./userRepository');

const DATA_DIR_PATH = 'test/data';

test('get_by_idのテスト', () => {
    const userRepository = new UserRepository(DATA_DIR_PATH);
    const user = userRepository.get_by_id('user2');
    expect(user.id).toBe("user2");
    expect(user.displayName).toBe("hamachi");
});