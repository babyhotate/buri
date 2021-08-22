const { EmojiRepository } = require('../repositories/emojiRepository');
const { Emoji } = require('../models/emoji');
const fs = require('fs');

const DATA_DIR_PATH = 'test/data';
const EMOJI_FILE_PATH = `${DATA_DIR_PATH}/emojis.txt`;

let emojiRepository;
beforeEach(() => {
    emojiRepository = new EmojiRepository(DATA_DIR_PATH);
    // emojis.txtをテストしたい状態にする
    fs.writeFileSync(EMOJI_FILE_PATH, ["good,👍", "dog,🐶"].join("\n"));
});

describe('#getEmojis', () => {
    test('emoji全件が取得できる', () => {
        const emojis = emojiRepository.getEmojis();
        expect(emojis.length).toBe(2);
        expect(emojis[0].name).toBe("good");
        expect(emojis[0].emoji).toBe("👍");
        expect(emojis[1].name).toBe("dog");
        expect(emojis[1].emoji).toBe("🐶");
    });
});