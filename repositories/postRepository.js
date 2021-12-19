const { Post } = require("../models/post");

class PostRepository {
  static tableName = "posts";
  static toModel(row) {
    const id = row["id"];
    const message = row["message"];
    const userId = row["user_id"];
    return new Post({ id, message, userId });
  }

  static async findAll(connection) {
    const [rows] = await connection.query(`SELECT * FROM ${this.tableName}`);
    const posts = rows.map((row) => this.toModel(row));
    return posts;
  }

  static async create(connection, userId, message) {
    await connection.execute(
      `INSERT INTO ${this.tableName} (user_id, message) VALUES (?, ?)`,
      [userId, message],
      function (err, results, fields) {}
    );
  }

  // @params id {Number}
  static async delete(connection, id) {
    await connection.query(`DELETE FROM ${this.tableName} where id = ${id}`);
  }

  // @params index {Number}
  static async update(connection, id, message) {
    await connection.execute(
      `UPDATE ${this.tableName} SET message = ? WHERE id = ?`,
      [message, id],
      function (err, results, fields) {}
    );
  }
}

module.exports.PostRepository = PostRepository;
