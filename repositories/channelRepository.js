const { Channel } = require('../models/channel');

class ChannelRepository {
  static tableName = "channels";

  static toModel(row) {
    return new Channel({
      id: row["id"],
      name: row["name"]
    });
  }

  static async getAll(connection) {
    const [rows] = await connection.query(
      `SELECT * FROM ${this.tableName}`
    );

    const channels = rows.map(row => this.toModel(row));
    return channels;
  }
}

module.exports.ChannelRepository = ChannelRepository;