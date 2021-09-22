const { User } = require('../models/user');

// 他のモデルも出揃ってきたらORM的な部分を抽出する？
class UserRepository {
  static tableName = "users";

  static toModel(row) {
    return new User(row["id"], row["user_id"], row["display_name"]);
  }

  static async getAll(connection) {
    const [rows] = await connection.query(
      `SELECT * FROM ${this.tableName}`
    );

    const users = rows.map((row) => this.toModel(row));
    return users;
  }

  static async getByUserId(connection, userId) {
    const [user] = await this.getByUserIds(connection, [userId]);
    return user;
  }

  static async getByUserIds(connection, userIds) {
    const [rows] = await connection.query(
      `SELECT * FROM ${this.tableName} WHERE user_id in (?)`,
      [userIds]
    );

    const users = rows.map(row => this.toModel(row));
    return users;
  }
}

module.exports.UserRepository = UserRepository;