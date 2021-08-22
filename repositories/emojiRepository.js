const fs = require('fs');
const { Emoji } = require('../models/emoji');

class EmojiRepository {
    filePath;

    constructor(dataDirPath) {
        this.filePath = `${dataDirPath}/emojis.txt`;
    }

    getEmojis() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "");
        }
        let emojis = fs.readFileSync(this.filePath, 'utf-8');

        // ["", "aaa", ""] => ["aaa"] 
        const emojiList = emojis.split('\n').filter(value => value !== "");

        // 文字列のリストから、Emojiモデルのリストを作る
        const models = emojiList.map(e => {
            const [name, emoji] = e.split(",");
            return new Emoji(name, emoji);
        });
        return models;
    }
}

module.exports.EmojiRepository = EmojiRepository;
