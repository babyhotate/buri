const fs = require('fs');
const { User } = require('./user');

class UserRepository {
  filePath;

  constructor(dataDirPath) {
    this.filePath = `${dataDirPath}/users.txt`;
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
  let filteredUsers = [];
  for (const id of ids) {
    const user = users.find(user => user.id === id);
    filteredUsers.push(user);
  }
  return filteredUsers;
}
}

module.exports.UserRepository = UserRepository;