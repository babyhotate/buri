const { Post } = require("../models/post");

class PostRepository {
  static tableName = "posts";
  static toModel(record) {
    const id = record["id"];
    const message = record["message"];
    const userId = record["user_id"];
    return new Post({ id, message, userId });
  }

  static async findAll(connection) {
    const [records] = await connection.query(`SELECT * FROM ${this.tableName}`);
    const posts = records.map((row) => this.toModel(row));
    return posts;
  }

  static async create(connection, userId, message) {
    try {
      await connection.query(`
        INSERT INTO ${this.tableName} (user_id, message) 
          VALUES 
          (${userId}, "${message}")
        `);
    } catch (e) {
      console.log(e.message);
    }
  }

  // @params id {Number}
  static async delete(connection, id) {
    try {
      await connection.query(`DELETE FROM ${this.tableName} where id = ${id}`);
    } catch (e) {
      console.log(e.message);
    }
  }

  // @params index {Number}
  static async update(connection, id, message) {
    try {
      await connection.query(`
        UPDATE ${this.tableName}
          SET message = "${message}"
          WHERE id = ${id}
      `);
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports.PostRepository = PostRepository;
