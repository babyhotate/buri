const fs = require('fs');

class User {
  filePath
  id
  displayName

  constructor(dataDirPath, id, displayName) {
    this.filePath = `${dataDirPath}/users.txt`;
    this.id = id
    this.displayName = displayName
  }

  get_by_id(id) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "");
    }

    // データストアの全データを読み出す
    let data = fs.readFileSync(this.filePath, 'utf-8');
    const lines = users.split('\n').filter(value => value !== "");

    // 読み出したデータをUserオブジェクトに変換し、リストに詰める
    let users = []
      const values = line.split(',')
      const user = new User(this.filePath, values[0], values[1])
      users.push(user)

    // Userオブジェクトのリストから指定されたIDのユーザを探し出す
    const user = users.find(user => user.id = id)
    return user;
  }
}

module.exports.User = User;