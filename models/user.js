class User {
  userId;
  id;
  displayName;
  password;

  constructor({ id, userId, displayName, password }) {
    this.id = id;
    this.userId = userId;
    this.displayName = displayName;
    this.password = password;
  }
}

module.exports.User = User;
