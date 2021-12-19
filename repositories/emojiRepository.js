const fs = require("fs");
const { Emoji } = require("../models/emoji");

class EmojiRepository {
  static tableName = "emojis";

  static toModel(row) {
    return new Emoji(row["name"], row["emoji"]);
  }

  static async getAll(connection) {
    const [rows] = await connection.query(`SELECT * FROM ${this.tableName}`);

    const emojis = rows.map((row) => this.toModel(row));
    return emojis;
  }
}

module.exports.EmojiRepository = EmojiRepository;
