class User {
  userId;
  id;
  displayName;

  constructor(id, userId, displayName) {
    this.id = id;
    this.userId = userId;
    this.displayName = displayName;
  }
}

module.exports.User = User;