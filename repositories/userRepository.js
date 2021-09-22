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

    const users = rows.map(row => this.toModel(row));
    return users;
  }

  static async getById(connection, id) {
    const [user] = await this.getByIds(connection, [id]);
    return user;
  }

  static async getByIds(connection, ids) {
    const [rows] = await connection.query(
      `SELECT * FROM ${this.tableName} WHERE user_id in (?)`,
      [ids]
    );

    const users = rows.map(row => this.toModel(row));
    return users;
  }
}

module.exports.UserRepository = UserRepository;