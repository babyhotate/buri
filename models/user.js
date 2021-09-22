class User {
  user_id;
  id;
  displayName;

  constructor(id, user_id, displayName) {
    this.id = id;
    this.user_id = user_id;
    this.displayName = displayName;
  }
}

module.exports.User = User;