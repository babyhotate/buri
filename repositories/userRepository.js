const fs = require('fs');
const { User } = require('../models/user');

class UserRepository {
  filePath;

  constructor(dataDirPath) {
    this.filePath = `${dataDirPath}/users.txt`;
  }

  getAll() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "");
    }

    // データストアの全データを読み出す
    let data = fs.readFileSync(this.filePath, 'utf-8');
    const lines = data.split('\n').filter(value => value !== "");

    return lines.map((line) => {
      const values = line.split(',');
      return new User(values[0], values[1]);
    });
  }

  getById(id) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "");
    }

    // データストアの全データを読み出す
    let data = fs.readFileSync(this.filePath, 'utf-8');
    const lines = data.split('\n').filter(value => value !== "");

    // 読み出したデータをUserオブジェクトに変換し、リストに詰める
    let users = [];
    for (const line of lines) {
      const values = line.split(',');
      users.push(new User(values[0], values[1]));
    }

    // Userオブジェクトのリストから指定されたIDのユーザを探し出す
    const user = users.find(user => user.id === id);
    return user;
  }

  getByIds(ids) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "");
    }

    // データストアの全データを読み出す
    let data = fs.readFileSync(this.filePath, 'utf-8');
    const lines = data.split('\n').filter(value => value !== "");

    // 読み出したデータをUserオブジェクトに変換し、リストに詰める
    let users = [];
    for (const line of lines) {
      const values = line.split(',');
      users.push(new User(values[0], values[1]));
    }

    // Userオブジェクトのリストから指定されたIDのユーザを探し出す
    return users.filter(user => ids.includes(user.id));
  }
}

module.exports.UserRepository = UserRepository;