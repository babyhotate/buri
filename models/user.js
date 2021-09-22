class User {
  id;
  record_id;
  displayName;

  constructor(record_id, id, displayName) {
    this.record_id = record_id;
    this.id = id;
    this.displayName = displayName;
  }
}

module.exports.User = User;